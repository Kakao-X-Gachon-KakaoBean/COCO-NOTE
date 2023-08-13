import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { Wrapper } from '@/styles/DetailSide/styles.tsx';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import MDEditor from '@uiw/react-md-editor';

import {
  CommentBox,
  EachCommentBox,
  EachCommentBoxBody,
  EachCommentBoxHeader,
  EachCommentBoxHeaderMember,
  IssueDetailBody,
  IssueDetailBox,
  IssueDetailComment,
  IssueDetailCommentInput,
  IssueDetailFooter,
  IssueDetailFooterMember,
  IssueDetailHeader,
  IssueDetailHeaderButtonSection,
  IssueDetailTop,
  ProfileImg,
} from '@/components/IssueDetail/styles.tsx';
import { useRecoilValueLoadable } from 'recoil';
import { projectInfoMenuOpenState } from '@/states/ProjectState.ts';
import { ActivityIndicator } from '@/components/ActivityIndicator';
import { Input } from '@/components/EditIssue/styles.tsx';
import { Comment, CreateComment, GetIssueDetail } from '@states/IssueState.ts';
import { postComment } from '@/Api/Issue/Issue.ts';
import { toast } from 'react-toastify';
import fetcher from '@utils/fetcher.ts';
import { BACKEND_URL } from '@/Api';

const IssueDetail = () => {
  const issueId: string | undefined = useParams().issueId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');

  const { isLoading, data: detailIssue } = useQuery<GetIssueDetail>(['detatilIssue'], () =>
    fetcher({
      queryKey: `${BACKEND_URL}/issues/${issueId}`,
    })
  );

  useEffect(() => {
    if (detailIssue && detailIssue.comments) {
      const newList = detailIssue?.comments.map(comment => ({
        commentId: comment.commentId,
        content: comment.content,
        writerName: comment.writerName,
        writtenTime: comment.writtenTime,
        thumbnailImg: comment.thumbnailImg,
      }));
      setComments(newList);
    }
  }, [detailIssue]);

  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);

  const getBack = () => {
    navigate(-1);
  };

  const editIssue = () => {
    navigate(`editIssue`);
  };

  const postCommentMutation = useMutation<'댓글 달기 완료' | '댓글 달기 실패', AxiosError, CreateComment>(
    'post comment',
    postComment,
    {
      onSuccess: data => {
        if (data === '댓글 달기 완료') {
          toast.success('댓글을 달았습니다.');
          queryClient.invalidateQueries('detatilIssue');
          setContent('');
        } else {
          toast.error('댓글 달기에 실패하였습니다.');
        }
      },
      onError: () => {
        alert('서버와 연결이 되어있지 않습니다.');
      },
    }
  );

  const submitComment: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.preventDefault();
      postCommentMutation.mutate({ content, issueId });
    },
    [postCommentMutation, content, issueId]
  );

  const DeleteAPI = useMutation<string, AxiosError, { IssueId: string }>(
    'DeleteIssue',
    ({ IssueId }) =>
      axios
        .delete(`localhost:3000/Issues/${IssueId}`, {
          withCredentials: true,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then(response => response.data),
    {
      onMutate() {},
      onSuccess(data: string) {
        queryClient.invalidateQueries('MySurvey');
        console.log(data);
      },
      onError(error) {
        alert('실패');
        console.log(error);
      },
    }
  );

  const DeleteIssue = useCallback(
    (IssueId: any) => {
      DeleteAPI.mutate({ IssueId });
    },
    [DeleteAPI]
  );

  if (isLoading) {
    return <h3>Loading....</h3>;
  }

  let contents = null;

  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <IssueDetailBox>
              <IssueDetailTop>
                <Button onClick={getBack}>뒤로 가기</Button>
              </IssueDetailTop>
              <IssueDetailHeader>
                <div>{detailIssue?.issue.title}</div>
                <IssueDetailHeaderButtonSection>
                  <Button onClick={DeleteIssue}>삭제</Button>
                  <Button onClick={editIssue}>수정</Button>
                </IssueDetailHeaderButtonSection>
              </IssueDetailHeader>
              <IssueDetailFooter>
                <IssueDetailFooterMember>
                  <ProfileImg src={detailIssue?.issue.thumbnailImg} alt="썸네일" />
                  <div>{detailIssue?.issue.writerName}</div>
                </IssueDetailFooterMember>
                <div>{detailIssue?.issue.writtenTime}</div>
              </IssueDetailFooter>
              <IssueDetailBody>
                <div data-color-mode="light" style={{ padding: 15 }}>
                  <MDEditor.Markdown source={detailIssue?.issue?.content} style={{ fontFamily: 'SCDream4' }} />
                </div>
              </IssueDetailBody>
              <IssueDetailComment>
                <IssueDetailCommentInput>
                  <Input
                    type="text"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="댓글을 달아주세요"
                  />
                  <Button onClick={submitComment}>Submit</Button>
                </IssueDetailCommentInput>
                <CommentBox>
                  {comments.map((comment, index) => (
                    <EachCommentBox key={index}>
                      <EachCommentBoxHeader>
                        <EachCommentBoxHeaderMember>
                          <ProfileImg src={comment.thumbnailImg} alt="썸네일" />
                          <div>{comment.writerName}</div>
                        </EachCommentBoxHeaderMember>
                        <div>{comment.writtenTime}</div>
                      </EachCommentBoxHeader>
                      <EachCommentBoxBody>{comment.content}</EachCommentBoxBody>
                    </EachCommentBox>
                  ))}
                </CommentBox>
              </IssueDetailComment>
            </IssueDetailBox>
          );
        } else {
          return <ActivityIndicator />;
        }
      };
      break;
    case 'hasError':
      contents = () => {
        return <div>데이터를 서버에서 불러올 수 없습니다.</div>;
      };
      break;
    case 'loading':
      contents = () => {
        return <ActivityIndicator />;
      };
      break;
    default:
      contents = () => {
        return <div>에러가 발생했습니다. 페이지를 새로고침해주세요.</div>;
      };
  }

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>{contents()}</Wrapper>
    </>
  );
};

export default IssueDetail;
