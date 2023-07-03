import { atom } from "recoil";

export interface IUser {
  isLoggingIn: boolean;
  name: string;
  email: string;
  password: string;
  emailAuthKey: string;
  checkPassword: string;
  accessToken: string;
  error: any;
}

const initialState: IUser = {
  isLoggingIn: false,
  name: "",
  email: "",
  password: "",
  emailAuthKey: "",
  checkPassword: "",
  accessToken: "",
  error: "",
};

export const UserState = atom({
  key: "UserState",
  default: initialState,
});
