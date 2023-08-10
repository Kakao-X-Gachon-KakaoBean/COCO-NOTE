//이슈 페이지 api

import { instance } from '@/Api';
import { CreateComment, CreateIssue } from '@states/IssueState.ts';

export const postIssue = async (data: CreateIssue) => {
  try {
    await instance.post('/issues', data);
    return '이슈 생성 완료';
  } catch (err) {
    return '이슈 생성 실패';
  }
};

export const postComment = async (data: CreateComment) => {
  try {
    await instance.post('/comments', data);
    return '댓글 달기 완료';
  } catch (err) {
    return '댓글 달기 실패';
  }
};
