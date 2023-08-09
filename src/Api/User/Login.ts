//로그인 페이지

import { instance } from '@/Api';
import { AxiosResponse } from 'axios';
import { LoginResponse, LoginUser } from '@states/userState.ts';

export const logIn = async (data: LoginUser): Promise<LoginResponse> => {
  const res: AxiosResponse<LoginResponse> = await instance.post('/local/login', data);

  return res.data;
};
