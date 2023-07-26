import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import MDEditor from '@uiw/react-md-editor';

import {
  CommentBox,
  EachCommentBox,
  EachCommentBoxBody,
  EachCommentBoxHeader,
  IssueDetailBody,
  IssueDetailBox,
  IssueDetailComment,
  IssueDetailCommentInput,
  IssueDetailHeader,
  IssueDetailHeaderButtonSection,
  IssueDetailTop,
} from '@components/IssueDetail/styles.tsx';
import { useRecoilValue } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { ActivityIndicator } from '@components/ActivityIndicator';
import { Input } from '@components/EditIssue/styles.tsx';
import { IssueDetailtext } from '@components/IssueDetail/mock.tsx';

interface Comment {
  content: string;
}
const IssueDetail = () => {
  const pageId: string | undefined = useParams().issueId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [value, setValue] = useState<string | undefined>(IssueDetailtext);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!projectInfoMenuOpen) {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 550);
    }
  }, [projectInfoMenuOpen]);

  const addComment = () => {
    const comment: Comment = { content: newComment };

    setComments([...comments, comment]);

    setNewComment('');
  };

  const getBack = () => {
    navigate(-1);
  };

  const dee = () => {
    console.log('delete');
  };

  const editIssue = () => {
    navigate(`editIssue`);
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
      {isVisible ? (
        <Wrapper>
          <IssueDetailBox>
            <IssueDetailTop>
              <Button onClick={getBack}>뒤로 가기</Button>
            </IssueDetailTop>
            <IssueDetailHeader>
              <div>{pageId}번째 이슈</div>
              <IssueDetailHeaderButtonSection>
                <Button onClick={DeleteIssue}>삭제</Button>
                <Button onClick={editIssue}>수정</Button>
              </IssueDetailHeaderButtonSection>
            </IssueDetailHeader>
            <IssueDetailBody>
              <div data-color-mode="light" style={{ padding: 15 }}>
                <MDEditor.Markdown source={value} style={{ fontFamily: 'SCDream4' }} />
              </div>
            </IssueDetailBody>
            <IssueDetailComment>
              <IssueDetailCommentInput>
                <Input
                  type="text"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="댓글을 달아주세요"
                />
                <Button onClick={addComment}>Submit</Button>
              </IssueDetailCommentInput>
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
            </IssueDetailComment>
          </IssueDetailBox>
        </Wrapper>
      ) : (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      )}
    </>
  );
};

export default IssueDetail;
