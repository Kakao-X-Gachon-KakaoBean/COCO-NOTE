//로그인 페이지

import { instance } from '@api';
import { AxiosResponse } from 'axios';
import { EditPassword, LoginResponse, LoginUser } from '@type/UserType.ts';

export const logIn = async (data: LoginUser): Promise<LoginResponse> => {
  const res: AxiosResponse<LoginResponse> = await instance.post('/local/login', data);

  return res.data;
};

export const modifyPassword = async (data: EditPassword) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await instance.patch(`/members/password`, data);
    return '비밀번호 변경 성공';
  } catch (error) {
    throw error;
  }
};
