// API
import { allUserAPI, host } from '../../api/APIRoutes';

// COMPONENT
import ChatContainer from '../../components/chatContainer/ChatContainer';
import Contacts from '../../components/contact/Contacts';
import Welcome from '../../components/welcome/Welcome';

// CSS
import './Chat.scss';

// DATA
import { UserParams } from '../../data/typeParams';

// MODULE
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

// REACT HOOK
import { useState, useEffect, useRef } from 'react';

function Chat() {
  const navigate = useNavigate();
  const socket = useRef<null | Socket<any, any>>(null);
  const [currentUser, setCurrentUser] = useState<UserParams | null>(null);
  const [contacts, setContacts] = useState<UserParams[]>([]);
  const [currentChat, setCurrentChat] = useState<UserParams | null>(null);

  const handleChatChange = (chat: UserParams) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (!localStorage.getItem('blufips-user')) {
      navigate('/login');
    } else {
      const storedUser = localStorage.getItem('blufips-user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setCurrentUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
      if (currentUser.isAvatarImageSet) {
        const fetchUser = async () => {
          const data = await axios.get(`${allUserAPI}/${currentUser._id}`);
          setContacts(data.data);
        };
        fetchUser();
      } else {
        navigate('/setavatar');
      }
    }
  }, [currentUser]);
  return (
    <div className='chat'>
      <div className='chat__container'>
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === null ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
}

export default Chat;
