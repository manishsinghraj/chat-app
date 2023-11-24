//ChatContext.jsx
import { createContext, useEffect, useState } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';

export const ChatContext = createContext();


export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [userChatsError, setUserChatsError] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);

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
    }, [user])

    return (<>
        <ChatContext.Provider value={{ userChats, userChatsError, isUserChatsLoading }}>
            {children}
        </ChatContext.Provider>
    </>)

}

