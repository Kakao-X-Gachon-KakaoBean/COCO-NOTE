import { atom } from 'recoil';

export interface IUser {
  isLoggingIn: boolean;
  name: string;
  email: string;
  password: string;
  emailAuthKey: string;
  checkPassword: string;
  accessToken: string;
  refreshToken: string;
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
  refreshToken: '',
  error: '',
};

atom({
  key: 'UserState',
  default: initialState,
});

export interface MypageUser {
  profileImg: string | undefined;
  thumbnailImg: string | null;
  name: string;
  email: string;
}
const myPageInitialState: MypageUser = {
  profileImg: undefined,
  thumbnailImg: null,
  name: '',
  email: '',
};
export const MyPageUserState = atom({
  key: 'MyPageUserState',
  default: myPageInitialState,
});
