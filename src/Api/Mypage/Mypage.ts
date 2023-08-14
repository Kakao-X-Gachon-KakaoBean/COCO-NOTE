//마이페이지

import { instance } from '@/Api';
import { EditName } from '@components/MyInfoCard/type.ts';

export const modifyMemberName = async (data: EditName) => {
  try {
    await instance.patch(`/members/name`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return '멤버 이름 변경 성공';
  } catch (err) {
    return '멤버 이름 변경 실패';
  }
};
