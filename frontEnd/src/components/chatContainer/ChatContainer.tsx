// API
import { getAllMessagesAPI, sendMessageAPI } from '../../api/APIRoutes';

// COMPONENT
import ChatInput from '../chatInput/ChatInput';
import Logout from '../logout/Logout';

// CSS
import './ChatContainer.scss';

// DATA
import { UserParams } from '../../data/typeParams';

// MODULE
import axios from 'axios';
import { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

// REACT HOOK
import { useEffect, useState, useRef } from 'react';

type ChatContainerParams = {
  currentChat: UserParams | null;
  currentUser: UserParams | null;
  socket: React.MutableRefObject<Socket<any, any> | null>;
};

type MessagesParam = {
  fromSelf: boolean;
  message: string;
  from?: string;
};

function ChatContainer({
  currentChat,
  currentUser,
  socket,
}: ChatContainerParams) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<MessagesParam[]>([]);
  const [arrivedMessage, setArrivedMessage] = useState<MessagesParam | null>(
    null
  );

  const handleSendMessage = async (msg: string) => {
    socket.current?.emit('send-msg', {
      to: currentChat?._id,
      from: currentUser?._id,
      msg,
    });

    await axios.post(sendMessageAPI, {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    const fetchChat = async () => {
      const response = await axios.post(getAllMessagesAPI, {
        from: currentUser?._id,
        to: currentChat?._id,
      });
      setMessages(response.data);
    };
    fetchChat();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (data: any) => {
        setArrivedMessage({
          fromSelf: false,
          message: data.msg,
          from: data.from,
        });
      });
    }
  }, [currentChat]);

  useEffect(() => {
    if (arrivedMessage && arrivedMessage.from === currentChat?._id) {
      setMessages((prev) => [...prev, arrivedMessage]);
    }
  }, [arrivedMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderMessages = (
    <div className='chat-messages'>
      {messages.map((message) => {
        return (
          <div
            ref={scrollRef}
            className={`chat-messages__message ${
              message.fromSelf ? 'sended' : 'received'
            }`}
            key={uuidv4()}
          >
            <div className='content'>
              <p>{message.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className='chat-container'>
      <div className='chat-header'>
        <div className='chat-header__user-details'>
          <div className='chat-header__avatar'>
            <img
              src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
              alt='avatar'
            />
          </div>
          <div className='chat-header__username'>
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      {renderMessages}
      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatContainer;
