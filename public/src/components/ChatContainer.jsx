import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { getAllMessagesRoute, sendMessageRoute } from './../utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        if (currentChat) {
            const fetchMessages = async () => {
                if (!currentUser || !currentChat) {
                    return;
                }
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                });
                setMessages(response.data);
            };
            fetchMessages();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });

        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (arrivalMessage) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage]);

    
    useEffect(() => {
        const chatMessages = document.querySelector(".chat-messages");
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            {currentChat && (
                <Container>
                    <div className="chat-header">
                        <div className="user-details">
                            <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                    alt=""
                                />
                            </div>
                            <div className="username">
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                        <Logout />
                    </div>
                    <div className="chat-messages">
                        {messages.map((message) => (
                            <div key={uuidv4()} className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                <div className="content">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    padding-bottom: 2rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }
    .chat-header {
        position: sticky; 
        top: 0; 
        z-index: 10; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
  background-color: #082b56;
}

.chat-header .user-details {
    padding:4rem 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.chat-header .user-details .avatar img {
  height: 2.5rem;
}

.chat-header .user-details .username h3 {
  color: white;
}
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        max-height: 600px; 
        &::-webkit-scrollbar{
            width:0.4rem;
            &-thumb{
                background-color:#ffffff39;
                width:0.1rem;
                border-radius:1rem;
                cursor:pointer;
            }
        }
    }
    .message {
        display: flex;
        align-items: center;
        .content {
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: #ffffff;
        }
    }
    .sended {
        justify-content: flex-end;
        .content {
            background-color: #4f0fff21;
        }
    }
    .recieved {
        justify-content: flex-start;
        .content {
            background-color: #9900ff20;
        }
    }
`;
    