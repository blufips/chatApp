// CSS
import './Contacts.scss';

// DATA
import { UserParams } from '../../data/typeParams';

// REACT HOOK
import { useState, useEffect } from 'react';

type ContactParams = {
  contacts: UserParams[];
  currentUser: UserParams | null;
  changeChat: (chat: UserParams) => void;
};

function Contacts({ contacts, currentUser, changeChat }: ContactParams) {
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [currentUserImage, setCurrentUserImage] = useState<string | null>(null);
  const [currentSelected, setCurrentSelected] = useState<number | null>(null);

  const changeCurrentChat = (index: number, contact: UserParams) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const renderContactList = (
    <div className='contacts__contact-list'>
      {contacts.map((contact, index) => {
        return (
          <div
            className={`contact ${index === currentSelected && 'selected'}`}
            key={index}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className='contact__avatar'>
              <img
                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                alt='avatar'
              />
            </div>
            <div className='contact__username'>
              <h3>{contact.username}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderContacts = (
    <div className='contacts'>
      <div className='contacts__trademark'>
        <h3>blufips</h3>
      </div>
      {renderContactList}
      <div className='current-user'>
        <div className='current-user__avatar'>
          <img
            src={`data:image/svg+xml;base64,${
              currentUserImage && currentUserImage
            }`}
            alt='avatar'
          />
        </div>
        <div className='contact__username'>
          <h2>{currentUser && currentUser.username}</h2>
        </div>
      </div>
    </div>
  );
  return <>{currentUserImage && currentUserName && renderContacts}</>;
}

export default Contacts;
