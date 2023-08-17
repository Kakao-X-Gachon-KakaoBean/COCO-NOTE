//회원가입 페이지

import { instance } from '@/api';
import { SignUpUser } from '@/types/UserType.ts';

export const signUp = async (data: SignUpUser) => {
  try {
    await instance.post('/members', data);
    return '회원가입 성공';
  } catch (err) {
    return '회원가입 실패';
  }
};

export const postEmail = async (data: string) => {
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
  } catch (err) {
    return '이메일 발송 실패';
  }
};
