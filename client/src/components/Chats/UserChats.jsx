//UserChats.jsx

import React from 'react'
import { useFetchRecipient } from '../../hooks/useFetchRecipient'
import { Container, Stack } from 'react-bootstrap';
import avatar from '../../assets/avatar.svg'

export const UserChats = ({ chat, user }) => {

    const { recipientUser } = useFetchRecipient(chat, user);

    console.log("recipientUser", recipientUser);
    return (
            <Stack direction="horizontal" gap={3} className="user-card align-item-center p-2 justify-content-between" role="button">
                <div className="d-flex">
                    <div className="me-2">
                        <img src={avatar} style={{ width: '35px' }} />
                    </div>
                    <div className="text-content">
                        <div className="name">{recipientUser?.name}</div>
                        <div className="text-message">TextMessage</div>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="date">
                        2022-11-24
                        <div className="this-user-notifications">2</div>
                        <div className="user-online"></div>

                    </div>
                </div>
            </Stack>
    )
}
