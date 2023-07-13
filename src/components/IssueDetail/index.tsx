import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import fetcher from '@utils/fetcher.ts';

interface Comment {
  content: string;
}
const IssueDetail = () => {
  const pageId = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

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

  //이슈 수정
  const edit = () => {
    console.log('edit');
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
      <Wrapper>
        <div style={{ padding: '1rem' }}>
          <div>{pageId.issueId}번째 페이지</div>
          <Button onClick={on}>뒤로 가기</Button>
          <Button onClick={DeleteIssue}>삭제</Button>
          <Button onClick={edit}>수정</Button>
          <div>
            <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} />
            <button onClick={addComment}>Submit</button>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment.content}</li>
              ))}
            </ul>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default IssueDetail;
