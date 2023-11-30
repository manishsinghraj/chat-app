//ChatContext.jsx
import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';
import { io } from "socket.io-client";

export const ChatContext = createContext();


export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [userChatsError, setUserChatsError] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);

    const [potentialChats, setPotentialChats] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);

    const [messages, setMessages] = useState(null);
    const [messagesError, setMessagesError] = useState(null);
    const [isMessageLoading, setIsMessageLoading] = useState(false);

    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);

    const [notifications, setNotifications] = useState([]);
    console.log("notifications", notifications);
   
/* ******************************************************************************************** */

    //UserChats
    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                setIsUserChatsLoading(false);

                if (response.error) {
                    return setUserChatsError(response);
                }

                // localStorage.setItem('UserChats', JSON.stringify(response))
                setUserChats(response);
            }
        }

        getUserChats();
    }, [user]);

    //We are trying to get the potential users other than the current Logged in User.
    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/user/getUsers`);

            if (response.error) {
                return console.log("Error Fetching Users", response); //TODO
            }

            const potentialUsers = response.filter((u) => {
                if (user?._id === u._id) return false; //Exclude current logged in
                let isChatCreated = false;

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id;
                    });
                }
                return !isChatCreated;
            });
            setPotentialChats(potentialUsers);
            setAllUsers(response);
        };

        getUsers();
    }, [userChats]);

    //CreateChat when clicked on potential userList
    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats/`, JSON.stringify({
            firstId, secondId
        }));

        if (response.error) {
            return console.log("Error creating Chat", response); //TODO
        }

        setUserChats((prev) => [...prev, response]);
    }, []);


    //Get Messages
    useEffect(() => {
        const getMessages = async () => {

            setIsMessageLoading(true);
            setMessagesError(null);

            const response = await getRequest(`${baseUrl}/message/${currentChat?._id}`);

            setIsMessageLoading(false);

            if (response.error) {
                return setMessagesError(response);
            }

            setMessages(response);

        }

        getMessages();
    }, [currentChat]);


    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return null;
        const response = await postRequest(`${baseUrl}/message`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }));

        if (response.error) {
            return setSendTextMessageError(response);
        }

        setNewMessage(response);
        setMessages((prev) => [...prev, response]);
        setTextMessage("");

    }, []);



    const updateCurrentChat = (chat) => {
        setCurrentChat(chat);
    };

    /* ******************************************************************************************** */

    //socket
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    console.log("onlineUsers", onlineUsers);


    // Establish a socket connection when the component mounts
    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_SOCKET_SERVER_HOST);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user]);


    //add Online Users
    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        })

        return () => {
            socket.off("getOnlineUsers");
        }
    }, [socket]);

    //send Message(socket.io)
    useEffect(() => {
        if (socket === null) return;
        const recipientId = currentChat?.members.find((id) => id !== user?._id);
        socket.emit("sendMessage", { ...newMessage, recipientId })
    }, [newMessage]);

    //recieve Message (socket.io) & Notification
    useEffect(() => {
        if (socket === null) return;
        socket.on("getMessage", res => {
            if (currentChat?._id !== res.chatId) return; //Avoid updating to unknown chat
            setMessages((prev) => [...prev, res]);
        });

        socket.on("getNotification", (res) => {
            console.log("currenttttt", currentChat);
            const isChatOpen = currentChat && currentChat.members.some((id) => id === res.senderId);

            setNotifications(prev => {
                if (isChatOpen) {
                    return [{ ...res, isRead: true }, ...prev];
                } else {
                    return [res, ...prev];
                }
            });
        });

        return () => {
            socket.off("getNofication");
            socket.off("getMessage");
        }
    }, [currentChat, socket]);


    /* ******************************************************************************************** */
    
    //Notifications
    const markAllNotificationsAsRead = useCallback((notifications) => {
        const mNotifications = notifications.map((n) => {
            return { ...n, isRead: true }
        });
        setNotifications(mNotifications);
    }, []);


    const markNotificationsAsRead = useCallback((n, notifications, userChats, user) => {
        //find chat to open

        const specificChat = userChats.find((chat) => {
            const chatMembers = [user._id, n.senderId];
            const isSpecificChat = chat?.members.every((member) => {
                return chatMembers.includes(member);
            });
            return isSpecificChat;
        });

        //mark now notification as read

        const mNotifications = notifications.map((el) => {
            if (n.senderId === el.senderId) {
                return { ...n, isRead: true };
            } else {
                return el;
            }
        });
        updateCurrentChat(specificChat);
        setNotifications(mNotifications);
    }, []);


    const markThisUserNotificationAsRead = useCallback((thisUserNotifications, notifications) => {
        //mark notifications as read

        const mNotifications = notifications.map((el) => {
            let notification;
            thisUserNotifications.forEach(n => {
                if (n.senderId === el.senderId) {
                    notification = { ...n, isRead: true };
                } else {
                    notification = el;
                }
            });
            return notification;
        });

        setNotifications(mNotifications);
    }, []);



    return (<>
        <ChatContext.Provider value={{ userChats, userChatsError, isUserChatsLoading, potentialChats, createChat, updateCurrentChat, currentChat, messages, messagesError, isMessageLoading, sendTextMessage, onlineUsers, notifications, allUsers, markAllNotificationsAsRead, markNotificationsAsRead, markThisUserNotificationAsRead }}>
            {children}
        </ChatContext.Provider>
    </>)

}

