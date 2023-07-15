// PAGE
import { Chat, Login, Register, Root, SetAvatar } from '../pages/index';

const Route = {
  path: '/',
  element: <Root />,
  children: [
    {
      path: '',
      element: <Chat />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'setavatar',
      element: <SetAvatar />,
    },
  ],
};

export default Route;
