import { instance } from '@/api';
import { ProjectInfo } from '@/types/ProjectType.ts';

export const addProject = async (data: ProjectInfo) => {
  try {
    await instance.post(`/projects`, data);
    return '프로젝트 생성 성공';
  } catch (err) {
    return '프로젝트 생성 실패';
  }
};
