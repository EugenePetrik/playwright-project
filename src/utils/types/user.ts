export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IAuthUser {
  user: {
    email: string;
    username: string;
    token: string;
  };
}
