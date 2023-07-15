// API
import { setAvatarAPI } from '../../api/APIRoutes';

// ASSETS
import loading from '../../assets/images/loading.gif';

// CSS
import './SetAvatar.scss';

// DATA
import { toastError } from '../../data/toastConfig';

// MODULE
import axios from 'axios';
import { Buffer } from 'buffer';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// REACT HOOK
import { useState, useEffect } from 'react';

function SetAvatar() {
  const avatarUrl = 'https://api.multiavatar.com';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setProfilePicture = async () => {
    if (selectedAvatar === null)
      toast.error('Please choose an avatar', toastError);
    else {
      try {
        const user = await JSON.parse(
          localStorage.getItem('blufips-user') || ''
        );
        const { data } = await axios.post(`${setAvatarAPI}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem('blufips-user', JSON.stringify(user));
          navigate('/');
        } else {
          toast.error('Failed to set avatar. Please retry', toastError);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('blufips-user')) {
      navigate('/login');
    }

    const fetchData = async () => {
      const avatarData = [];
      for (let n = 0; n < 4; n++) {
        const randomNumber = Math.round(Math.random() * 1000);
        try {
          const avatarImage = await axios.get(`${avatarUrl}/${randomNumber}`);
          const buffer = Buffer.from(avatarImage.data, 'binary');
          avatarData.push(buffer.toString('base64'));
        } catch (ex) {
          console.log(
            `Failed to fetch avatars random number ${randomNumber}. Please retry`
          );
        }
      }
      setAvatars(avatarData);
      setIsLoading(false);
    };

    const debouncedFetchData = debounce(fetchData, 500);

    debouncedFetchData();
  }, []);

  const renderAvatarImages = (
    <div className='setavatar__images'>
      {avatars.map((avatar, index) => {
        return (
          <div
            className={`setavatar__avatar ${
              selectedAvatar === index && 'selected'
            }`}
            key={index}
          >
            <img
              src={`data:image/svg+xml;base64,${avatar}`}
              alt='avatar'
              onClick={() => setSelectedAvatar(index)}
            />
          </div>
        );
      })}
    </div>
  );

  const renderSetAvatar = (
    <>
      <div className='setavatar__title'>
        <h1>Choose an avatar for your profile picture</h1>
      </div>
      {renderAvatarImages}
      <button className='setavatar__submit-btn' onClick={setProfilePicture}>
        Continue
      </button>
    </>
  );

  return (
    <div className='setavatar'>
      {isLoading ? (
        <img src={loading} alt='loading' className='setavatar__loading' />
      ) : (
        renderSetAvatar
      )}
    </div>
  );
}

export default SetAvatar;
