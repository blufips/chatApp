type UserParams = {
  _id: string;
  username: string;
  isAvatarImageSet: string;
  avatarImage: string;
};

type UserDataParams = {
  username: string;
  email?: string;
  password: string;
  confirmpassword?: string;
};

export type { UserParams, UserDataParams };
