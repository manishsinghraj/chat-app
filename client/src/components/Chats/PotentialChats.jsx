//PotentialChats.jsx

import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext';

const PotentialChats = () => {
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    return (
        <div className='all-users'>
            {potentialChats && potentialChats.map((u) => (
                <div key={u._id} className="single-user" onClick={() => createChat(user._id, u._id)}>
                    {u.name}
                    <span className={onlineUsers.some((user) => (user?.userId === u?._id)) ? "user-online" : "user-offline"}></span>
                </div>
            ))}
        </div>
    );
}

export default PotentialChats;
