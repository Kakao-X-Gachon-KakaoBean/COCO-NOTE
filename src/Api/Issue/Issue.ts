//이슈 페이지 api

import { instance } from '@/Api';
import { CreateComment, CreateIssue } from '@states/IssueState.ts';
import fetcher from '@utils/fetcher.ts';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
export const fetchPage = async (projectId: string | undefined, nextPage: number) => {
  return fetcher({
    queryKey: `${BACKEND_URL}/issues/page?projectId=${projectId}&page=${nextPage}`,
  });
};
