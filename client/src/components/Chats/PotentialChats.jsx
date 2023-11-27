//PotentialChats.jsx

import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext';

const PotentialChats = () => {
    const { potentialChats, createChat } = useContext(ChatContext);
    const { user } = useContext(AuthContext)
    console.log("potentialChats", potentialChats)
    return (
        <>
            <div className='all-users'>
                {potentialChats && potentialChats.map((u, index) => {
                    return (
                        <>
                            <div className="single-user" key={index} onClick={(e) => createChat(user._id, u._id)}>
                                {u.name}
                                <span className="user-online"></span>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default PotentialChats