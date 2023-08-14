import { instance } from '@/Api';
import { ProjectInfo } from '@states/ProjectState.ts';

export const addProject = async (data: ProjectInfo) => {
  try {
    await instance.post(`/projects`, data);
    return '프로젝트 생성 성공';
  } catch (err) {
    return '프로젝트 생성 실패';
  }
};
