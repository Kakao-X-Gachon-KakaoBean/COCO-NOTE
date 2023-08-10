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

// 원고 수정 권한 확인
export const verifyEditPermissions = async (scriptId: string) => {
  try {
    const response = await instance.patch(`/manuscripts/${scriptId}/access-status`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    return '원고 수정 권한 확인 실패';
  }
};
