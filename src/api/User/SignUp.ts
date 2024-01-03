//회원가입 페이지

import { instance } from '@api';
import { SignUpUser } from '@type/UserType.ts';

export const signUp = async (data: SignUpUser) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await instance.post('/members', data);
    return '회원가입 성공';
  } catch (error) {
    throw error;
  }
};

export const postEmail = async (data: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await instance.post(
      '/emails',
      { email: data },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return '이메일 발송 성공';
  } catch (error) {
    throw error;
  }
};
