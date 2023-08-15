import { BACKEND_URL, instance } from '@/Api';
import { CreateComment, CreateIssue, EditIssue } from '@/states/IssueState.ts';
import fetcher from '@/utils/fetcher.ts';

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

export const deleteIssue = async (issueId: string) => {
  try {
    await instance.delete(`/issues/${issueId}`);
    return '이슈 삭제 성공';
  } catch (err) {
    return '이슈 삭제 실패';
  }
};

export const editIssue = async (issueId: string, data: EditIssue) => {
  try {
    await instance.patch(`/issues/${issueId}`, data);
    return '이슈 수정 성공';
  } catch (err) {
    return '이슈 수정 실패';
  }
};
