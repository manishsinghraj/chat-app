//UserChats.jsx

import React, { useContext } from 'react'
import { useFetchRecipient } from '../../hooks/useFetchRecipient'
import { Stack } from 'react-bootstrap';
import avatar from '../../assets/avatar.svg'
import { ChatContext } from '../../context/ChatContext';
import { unreadNotificationsFunc } from '../../utils/unReadNotification';
import { useFetchLatestMessage } from '../../hooks/useFetchLatestMessage';
import moment from 'moment';

export const UserChats = ({ chat, user }) => {

    const { recipientUser } = useFetchRecipient(chat, user);
    const { onlineUsers, notifications, markThisUserNotificationAsRead } = useContext(ChatContext);

    const isOnline = onlineUsers.some((user) => (user?.userId === recipientUser?._id));
    const unreadNotifications = unreadNotificationsFunc(notifications); //This will give allnotification counts, we need to get notification counts specific to sender

    const thisUserNotifications = unreadNotifications?.filter((n) => {
        return n.senderId === recipientUser?._id;
    });

    const { latestMessage } = useFetchLatestMessage(chat);

    const truncateText = (text) => {
        let shortText = text.substring(0, 20);

        if (text.length > 20) {
            shortText = shortText + "...";
        };

        return shortText;
    }

    return (
        <Stack direction="horizontal" gap={3} className="user-card align-item-center p-2 justify-content-between" role="button"
            onClick={() => {
                if (thisUserNotifications?.length !== 0) {
                    markThisUserNotificationAsRead(thisUserNotifications, notifications);
                }
            }}>
            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} style={{ width: '35px' }} />
                </div>
                <div className="text-content">
                    <div className="name">{recipientUser?.name}</div>
                    <div className="text-message">{latestMessage?.text &&
                        <span>{truncateText(latestMessage?.text)}</span>}</div>
                </div>
            </div>
            <div className="d-flex">
                <div className="date">
                    {moment(latestMessage?.createdAt).calendar()}
                    <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>
                        {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ""}
                    </div>
                    <span className={isOnline ? "user-online" : "user-offline"}></span>
                </div>
            </div>
        </Stack>
    )
}
