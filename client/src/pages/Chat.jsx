//Chat.jsx

import React, { useContext } from "react"
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap"
import { UserChats } from "../components/Chats/UserChats";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/Chats/PotentialChats";
import { ChatBox } from "../components/Chats/ChatBox";

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, userChatsError, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);

  console.log(userChats, userChatsError, isUserChatsLoading);
  return (
    <>
      <Container>
        <Stack direction="horizontal" gap={3} className="align-items-start">
          {userChats?.length < 1 ? null :
            <>
              <Stack className="flex-grow-0 message-box pe-3" gap={3}>
                {isUserChatsLoading && <p>Loading Chats..</p>}
                {userChats?.map((chat, index) => {
                  return (
                    <div key={index} onClick={() => { updateCurrentChat(chat) }}>
                      <UserChats chat={chat} user={user}></UserChats>
                    </div>
                  )
                })}
              </Stack>
            </>
          }
          <ChatBox/>
          <PotentialChats />
        </Stack>
      </Container>
    </>
  )
}