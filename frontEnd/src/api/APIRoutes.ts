// BASE
const host = 'http://localhost:5000';

// AUTH
const allUserAPI = `${host}/api/auth/allusers`;
const loginAPI = `${host}/api/auth/login`;
const registerAPI = `${host}/api/auth/register`;
const setAvatarAPI = `${host}/api/auth/setAvatar`;

// MESSAGE
const sendMessageAPI = `${host}/api/messages/addmsg`;
const getAllMessagesAPI = `${host}/api/messages/getmsg`;

export {
  allUserAPI,
  getAllMessagesAPI,
  loginAPI,
  registerAPI,
  setAvatarAPI,
  sendMessageAPI,
};
