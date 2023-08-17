import { instance } from '@/Api';
import { CreateManuscript } from '@/types/CreateReleaseNoteModalType.ts';
import { SaveEditedManuscript } from '@/types/ReleaseNoteEditType.ts';
import { DistributeManuscript } from '@/types/SingleManuScriptType.ts';

// 원고 생성
export const createManuscript = async (data: CreateManuscript) => {
  try {
    await instance.post('/manuscripts', data);
    return '원고 생성 성공';
  } catch (err) {
    return '원고 생성 실패';
  }
};

// 원고 수정 권한 확인
export const verifyEditPermissions = async (scriptId: string) => {
  try {
    const response = await instance.patch(`/manuscripts/${scriptId}/access-status`);
    return response.data;
  } catch (err) {
    return '원고 수정 권한 확인 실패';
  }
};

// 원고 수정
export const saveEditedManuscript = async (data: SaveEditedManuscript) => {
  const { manuscriptId, ...dataWithoutId } = data;
  try {
    await instance.patch(`/manuscripts/${data.manuscriptId}`, dataWithoutId);
    return '원고 수정 성공';
  } catch (err) {
    return '원고 수정 실패';
  }
};

// 원고 삭제
export const deleteManuscript = async (scriptId: string) => {
  try {
    await instance.delete(`/manuscripts/${scriptId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return '원고 삭제 성공';
  } catch (err) {
    return '원고 삭제 실패';
  }
};

// 원고 배포
export const distributeManuscript = async (data: DistributeManuscript) => {
  try {
    await instance.post(`/release-notes`, data);
    return '원고 배포 성공';
  } catch (err) {
    return '원고 배포 실패';
  }
};
