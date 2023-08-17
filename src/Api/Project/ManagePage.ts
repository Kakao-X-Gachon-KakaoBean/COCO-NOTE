//프로젝트 관리 페이지

import { instance } from '@/Api';
import { EditProject, ModifyMember } from '@/types/ProjectType.ts';

export const editProjectInfo = async (projectId: string | undefined, data: EditProject) => {
  try {
    await instance.patch(`/projects/${projectId}`, data);
    return '정보 수정 성공';
  } catch (err) {
    return '정보 수정 실패';
  }
};

export const inviteMember = async (projectId: string | undefined, data: { invitedMemberEmails: string[] }) => {
  try {
    await instance.post(`/projects/${projectId}/invitation`, data);
    return '멤버 초대 성공';
  } catch (err) {
    return '멤버 초대 실패';
  }
};

export const deleteMember = async (projectId: string | undefined) => {
  try {
    await instance.delete(`/projects/${projectId}`);
    return '삭제 성공';
  } catch (err) {
    return '삭제 실패';
  }
};

export const modifyMemberRole = async (projectId: string | undefined, data: ModifyMember) => {
  try {
    await instance.patch(`/projects/${projectId}/members`, data);
    return '권한 수정 성공';
  } catch (err) {
    return '권한 수정 실패';
  }
};
