// API
import { getAllMessagesAPI, sendMessageAPI } from '../../api/APIRoutes';

// COMPONENT
import ChatInput from '../chatInput/ChatInput';
import Logout from '../logout/Logout';
import Messages from '../messages/Messages';

// CSS
import './ChatContainer.scss';

// DATA
import { UserParams } from '../../data/typeParams';

// MODULE
import axios from 'axios';

// REACT HOOK
import { useEffect, useState } from 'react';

type ChatContainerParams = {
  currentChat: UserParams | null;
  currentUser: UserParams | null;
};

type MessagesParam = {
  fromSelf: string;
  message: string;
};

function ChatContainer({ currentChat, currentUser }: ChatContainerParams) {
  const [messages, setMessages] = useState<MessagesParam[]>([]);

  const handleSendMessage = async (message: string) => {
    await axios.post(sendMessageAPI, {
      from: currentUser?._id,
      to: currentChat?._id,
      message,
    });
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

  const renderMessages = (
    <div className='chat-messages'>
      {messages.map((message, index) => {
        return (
          <div
            className={`chat-messages__message ${
              message.fromSelf ? 'sended' : 'received'
            }`}
            key={index}
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
