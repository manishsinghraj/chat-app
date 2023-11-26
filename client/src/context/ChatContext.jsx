//ChatContext.jsx
import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';

export const ChatContext = createContext();


export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [userChatsError, setUserChatsError] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);

    const [potentialChats, setPotentialChats] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);

    const [messages, setMessages] = useState(null);
    const [messagesError, setMessagesError] = useState(null);
    const [isMessageLoading, setIsMessageLoading] = useState(false);

    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);


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

                localStorage.setItem('UserChats', JSON.stringify(response))
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


    const updateCurrentChat = (chat) => {
        setCurrentChat(chat);
    };

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

    }, [])

    return (<>
        <ChatContext.Provider value={{ userChats, userChatsError, isUserChatsLoading, potentialChats, createChat, updateCurrentChat, currentChat, messages, messagesError, isMessageLoading, sendTextMessage }}>
            {children}
        </ChatContext.Provider>
    </>)

}

