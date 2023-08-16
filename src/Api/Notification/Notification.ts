import { instance } from '@/Api';

//알림 열람 상태 변경
export const modifyNotificationStatus = async ({ notificationId, url }: { notificationId: string; url: string }) => {
  try {
    await instance.patch(`/notifications/${notificationId}`);
    return url; // 성공 시에 url 반환
  } catch (err) {
    throw new Error('알림 열람 상태 변경 실패');
  }
};
