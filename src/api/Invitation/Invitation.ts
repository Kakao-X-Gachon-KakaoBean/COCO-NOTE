import { instance } from '@/api';

export const inviteMember = async ({ projectSecretKey }: { projectSecretKey: string | undefined }) => {
  try {
    await instance.post('/projects/members', { projectSecretKey });
    return '참여 완료';
  } catch (err) {
    return '참여 실패';
  }
};
