// CSS
import './ChatInput.scss';

// MODULE
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

// REACT HOOK
import { useState } from 'react';

type ChatInputParams = {
  handleSendMessage: (message: string) => Promise<void>;
};

const ChatInput = ({ handleSendMessage }: ChatInputParams) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg('');
    }
  };

  return (
    <div className='chat-input'>
      <div className='button-container'>
        <div className='button-container__emoji'>
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={(emojiObject) =>
                setMsg((prevMsg) => prevMsg + emojiObject.emoji)
              }
            />
          )}
        </div>
      </div>
      <form className='input-container' onSubmit={sendChat}>
        <input
          type='text'
          placeholder='Type your message here'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className='input-container__submit'>
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
