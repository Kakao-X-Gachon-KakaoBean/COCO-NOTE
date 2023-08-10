import { instance } from '@/Api';
import { CreateManuscript } from '@components/ReleaseNote/CreateReleaseNoteModal/type.ts';

// 원고 생성
export const createManuscript = async (data: CreateManuscript) => {
  try {
    await instance.post('/manuscripts', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return '원고 생성 성공';
  } catch (err) {
    return '원고 생성 실패';
  }
};
