//Chat.jsx

import React, { useContext } from "react"
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap"
import { UserChats } from "../components/Chats/UserChats";
import { AuthContext } from "../context/AuthContext";

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, userChatsError, isUserChatsLoading } = useContext(ChatContext);

  console.log(userChats, userChatsError, isUserChatsLoading);
  return (
    <>
      <Container>
        {userChats?.length < 1 ? null :
          <Stack direction="horizontal" gap={3} className="align-item-start">
            <Stack className="flex-grow-0 message-box pe-3" gap={3}>
              {isUserChatsLoading && <p>Loading Chats..</p>}
              {userChats?.map((chat, index) => {
                return (
                  <div key={index}>
                    <UserChats chat={chat} user={user}></UserChats>
                  </div>
                )
              })}
            </Stack>
            <p>chatBox</p>
          </Stack>
        }
      </Container>
    </>
  )
}
