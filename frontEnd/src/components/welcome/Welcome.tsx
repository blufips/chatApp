// ASSETS
import Waving from '../../assets/images/waving.gif';

// CSS
import './Welcome.scss';

// DATA
import { UserParams } from '../../data/typeParams';

type WelcomeParams = {
  currentUser: UserParams | null;
};

function Welcome({ currentUser }: WelcomeParams) {
  return (
    <div className='welcome'>
      <img src={Waving} alt='Waving' />
      <h1>
        Hi, <span>{currentUser?.username}</span>
      </h1>
      <h3>Choose a chat to Start Messaging</h3>
    </div>
  );
}

export default Welcome;
