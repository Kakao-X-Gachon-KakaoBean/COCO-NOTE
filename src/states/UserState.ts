import { atom } from 'recoil';

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
  name: '',
  email: '',
  password: '',
  emailAuthKey: '',
  checkPassword: '',
  accessToken: '',
  error: '',
};

atom({
  key: 'UserState',
  default: initialState,
});

export interface MypageUser {
  originalImage: string | undefined;
  profileImage: string | null;
  name: string;
  email: string;
}
const myPageInitialState: MypageUser = {
  originalImage: undefined,
  profileImage: null,
  name: '김윤호',
  email: 'hkj9909@gmail.com',
};
export const MyPageUserState = atom({
  key: 'MyPageUserState',
  default: myPageInitialState,
});
