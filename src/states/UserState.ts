import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IUser } from '@type/UserType.ts';

const { persistAtom } = recoilPersist();

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

export const memberIdState = atom({
  key: 'memberAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
