// COMPONENT
import Logout from '../logout/Logout';

// CSS
import './ChatContainer.scss';

// DATA
import { UserParams } from '../../data/typeParams';

type ChatContainerParams = {
  currentChat: UserParams | null;
};

function ChatContainer({ currentChat }: ChatContainerParams) {
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
      <div className='chat-container__chat-messages'></div>
      <div className='chat-container__chat-input'></div>
    </div>
  );
}

export default ChatContainer;
