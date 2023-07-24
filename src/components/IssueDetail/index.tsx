import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Modal } from 'antd';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import fetcher from '@utils/fetcher.ts';
import {
  CommentBox,
  EachCommentBox,
  EachCommentBoxBody,
  EachCommentBoxHeader,
} from '@components/IssueDetail/styles.tsx';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useRecoilValue } from 'recoil';

interface Comment {
  content: string;
}
const IssueDetail = () => {
  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);

  const pageId = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { TextArea } = Input;

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [issueContent, setIssueContent] = useState('');
  const [issueModalOpen, SetProjectModalOpen] = useState(false);

  const cancleModal = () => {
    SetProjectModalOpen(false);
  };
  const addComment = () => {
    const comment: Comment = { content: newComment };

    setComments([...comments, comment]);

    setNewComment('');
  };

  //이슈 페이지로 돌아가기
  const on = () => {
    navigate('/issue');
  };

  //이슈 삭제
  const dee = () => {
    console.log('delete');
  };

  const editIssue = () => {
    SetProjectModalOpen(true);
  };

  // const {
  //   isLoading,
  //   isSuccess,
  //   status,
  //   isError,
  //   data: MySurvey,
  //   error,
  // } = useQuery(['IssueList'], () => fetcher({ queryKey: `localhost:3000/2123` }));

  const DeleteAPI = useMutation<string, AxiosError, { IssueId: string }>(
    'DeleteIssue',
    ({ IssueId }) =>
      axios
        .delete(`localhost:3000/Issue/${IssueId}`, {
          withCredentials: true,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then(response => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        queryClient.invalidateQueries('MySurvey');
      },
      onError(error) {
        alert('실패');
      },
    }
  );

  const DeleteIssue = useCallback(
    (IssueId: any) => {
      DeleteAPI.mutate({ IssueId });
    },
    [DeleteAPI]
  );

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper open={projectInfoMenuOpen}>
        <div style={{ padding: '1rem' }}>
          <div>{pageId.issueId}번째 페이지</div>
          <Button onClick={on}>뒤로 가기</Button>
          <Button onClick={DeleteIssue}>삭제</Button>
          <Button onClick={editIssue}>수정</Button>
          <div>
            <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} />
            <button onClick={addComment}>Submit</button>
            <CommentBox>
              {comments.map((comment, index) => (
                <EachCommentBox key={index}>
                  <EachCommentBoxHeader>
                    <div>작성자 이름</div>
                    <div>작성 일자</div>
                  </EachCommentBoxHeader>
                  <EachCommentBoxBody>{comment.content}</EachCommentBoxBody>
                </EachCommentBox>
              ))}
            </CommentBox>
          </div>
        </div>
        <Modal
          title="이슈 변경"
          open={issueModalOpen}
          onCancel={cancleModal}
          footer={
            <div>
              <Button key="submit" type="primary">
                OK
              </Button>
            </div>
          }
        >
          <TextArea
            value={issueTitle}
            autoSize={{ minRows: 1, maxRows: 10 }}
            onChange={e => setIssueTitle(e.target.value)}
            placeholder="이슈 제목"
            style={{ marginBottom: '2rem', marginTop: '3rem' }}
          />
          <TextArea
            value={issueContent}
            autoSize={{ minRows: 3, maxRows: 10 }}
            onChange={e => setIssueContent(e.target.value)}
            placeholder="이슈 내용"
            style={{ marginBottom: '2rem' }}
          />
        </Modal>
      </Wrapper>
    </>
  );
};

export default IssueDetail;
