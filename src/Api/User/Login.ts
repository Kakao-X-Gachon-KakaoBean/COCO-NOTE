//로그인 페이지

import { instance } from '@/Api';
import { AxiosResponse } from 'axios';
import { LoginUser } from '@states/userState.ts';

export const logIn = async (data: LoginUser): Promise<LoginUser> => {
  try {
    const res: AxiosResponse<LoginUser> = await instance.post('/local/login', data);

    return res.data;
  } catch (err) {
    console.log('회원가입 실패');
    throw err;
  }
};
