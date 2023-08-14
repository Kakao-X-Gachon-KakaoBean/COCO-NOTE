//스프린트 페이지

import { instance } from '@/Api';
import {
  ChangeWorkerType,
  CreateSprintDataType,
  CreateTaskDataType,
  EditSprintDataType,
  EditTaskDataType,
  WorkStatusType,
} from '@states/SprintState.ts';
// import fetcher from '@utils/fetcher.ts';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// 스프린트 생성
export const createSprint = async (data: CreateSprintDataType) => {
  try {
    await instance.post('/sprints', data);
    return '스프린트 생성 완료';
  } catch (err) {
    return '스프린트 생성 실패';
  }
};

// 하위작업 생성
export const createTask = async (data: CreateTaskDataType) => {
  try {
    await instance.post('/tasks', data);
    return '하위작업 생성 완료';
  } catch (err) {
    return '하위작업 생성 실패';
  }
};

// 스프린트 삭제
export const deleteSprint = async (data: number) => {
  try {
    await instance.delete(`${BACKEND_URL}/sprints/${data}`);
    return '스프린트 삭제 완료';
  } catch (err) {
    return '스프린트 삭제 실패';
  }
};

// 하위작업 삭제
export const deleteTask = async (data: number) => {
  try {
    await instance.delete(`${BACKEND_URL}/tasks/${data}`);
    return '하위작업 삭제 완료';
  } catch (err) {
    return '하위작업 삭제 실패';
  }
};

// 스프린트 수정
export const editSprint = async (data: EditSprintDataType, selectedSprintId: number) => {
  try {
    await instance.patch(`${BACKEND_URL}/sprints/${selectedSprintId}`, data);
    return '스프린트 수정 완료';
  } catch (err) {
    return '스프린트 수정 실패';
  }
};

// 하위작업 수정
export const editTask = async (data: EditTaskDataType, selectedTaskId: number) => {
  try {
    await instance.patch(`${BACKEND_URL}/tasks/${selectedTaskId}`, data);
    return '하위작업 수정 완료';
  } catch (err) {
    return '하위작업 수정 실패';
  }
};

// 작업 담당자 할당
export const changeWorker = async (data: ChangeWorkerType) => {
  try {
    await instance.patch(`${BACKEND_URL}/tasks/${data.taskId}/assignment/${data.memberId}`, data);
    return '작업자 할당 완료';
  } catch (err) {
    return '작업자 할당 실패';
  }
};

// 작업 상태 변경
export const changeWorkStatus = async (data: WorkStatusType) => {
  try {
    await instance.patch(`${BACKEND_URL}/tasks/${data.taskId}/work-status`, data);
    return '작업 상태 변경 완료';
  } catch (err) {
    return '작업 상태 변경 실패';
  }
};
