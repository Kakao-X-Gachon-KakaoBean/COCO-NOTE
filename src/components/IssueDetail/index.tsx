import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { Wrapper } from '@/styles/DetailSide/styles.tsx';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
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

import { Comment, CreateComment, EditComment, GetIssueDetail } from '@states/IssueState.ts';
import { deleteComment, deleteIssue, editComment, postComment } from '@/Api/Issue/Issue.ts';

import { toast } from 'react-toastify';
import fetcher from '@/utils/fetcher.ts';
import { BACKEND_URL } from '@/Api';
import defaultImage from '@/images/defaultAvatar.png';
import TextArea from 'antd/es/input/TextArea';

const IssueDetail = () => {
  const issueId: string | undefined = useParams().issueId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [clickCommentId, setClickCommentId] = useState<number>();
  const [newComment, setNewComment] = useState<string>('');

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

  const handelCommentModal = () => {
    setCommentModalOpen(false);
  };

  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);

  const getBack = () => {
    navigate(-1);
  };

  const editIssue = () => {
    navigate('editIssue', {
      state: {
        IssueData: detailIssue,
      },
    });
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

  const submitComment: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = useCallback(
    e => {
      e.preventDefault();
      postCommentMutation.mutate({ content, issueId });
    },
    [postCommentMutation, content, issueId]
  );

  const deleteIssueMutation = useMutation(deleteIssue, {
    onSuccess: data => {
      if (data === '이슈 삭제 성공') {
        toast.success('이슈가 삭제되었습니다.');
        navigate(-1);
      } else {
        toast.error('에러가 발생하였습니다.');
      }
    },
  });

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: data => {
      if (data === '댓글 삭제 성공') {
        toast.success('댓글이 삭제되었습니다.');
        queryClient.invalidateQueries('detatilIssue');
      } else {
        toast.error('에러가 발생하였습니다.');
      }
    },
  });

  const editCommentMutation = useMutation<'댓글 수정 성공' | '댓글 수정 실패', AxiosError, EditComment>(
    'editIssue',
    (data: EditComment) => editComment(clickCommentId, data),
    {
      onSuccess: data => {
        if (data === '댓글 수정 성공') {
          toast.success('수정 완료하였습니다.');
          setNewComment('');
          setCommentModalOpen(false);
          queryClient.invalidateQueries('detatilIssue');
        } else {
          toast.error('양식을 제대로 입력해주세요.');
        }
      },
      onError: () => {
        alert('서버와 연결이 되어있지 않습니다.');
      },
    }
  );

  const editProject = useCallback(
    (e: any) => {
      e.preventDefault();
      editCommentMutation.mutate({ content: newComment });
    },
    [newComment, editCommentMutation]
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
            <>
              <IssueDetailBox>
                <IssueDetailTop>
                  <Button onClick={getBack}>뒤로 가기</Button>
                </IssueDetailTop>
                <IssueDetailHeader>
                  <div>{detailIssue?.issue.title}</div>
                  <IssueDetailHeaderButtonSection>
                    <Button
                      onClick={() => {
                        deleteIssueMutation.mutate(issueId ?? '');
                      }}
                    >
                      삭제
                    </Button>
                    <Button onClick={editIssue}>수정</Button>
                  </IssueDetailHeaderButtonSection>
                </IssueDetailHeader>
                <IssueDetailFooter>
                  <IssueDetailFooterMember>
                    <ProfileImg
                      src={detailIssue?.issue.thumbnailImg !== null ? detailIssue?.issue.thumbnailImg : defaultImage}
                    />
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
                            <div>
                              <ProfileImg
                                src={
                                  detailIssue?.issue.thumbnailImg !== null
                                    ? detailIssue?.issue.thumbnailImg
                                    : defaultImage
                                }
                              />
                              <div>{comment.writerName}</div>
                            </div>
                            <div>
                              <Button
                                onClick={() => {
                                  setClickCommentId(comment.commentId);
                                  setCommentModalOpen(true);
                                }}
                              >
                                수정
                              </Button>
                              <Button
                                onClick={() => {
                                  deleteCommentMutation.mutate(comment.commentId ?? '');
                                }}
                              >
                                삭제
                              </Button>
                            </div>
                          </EachCommentBoxHeaderMember>
                          <div>{comment.writtenTime}</div>
                        </EachCommentBoxHeader>
                        <EachCommentBoxBody>{comment.content}</EachCommentBoxBody>
                      </EachCommentBox>
                    ))}
                  </CommentBox>
                </IssueDetailComment>
              </IssueDetailBox>
              <Modal
                title="댓글 변경"
                open={commentModalOpen}
                onCancel={handelCommentModal}
                footer={
                  <div>
                    <Button key="submit" style={{ width: '5rem' }} onClick={editProject}>
                      변경하기
                    </Button>
                  </div>
                }
              >
                <TextArea
                  value={newComment}
                  autoSize={{ minRows: 3, maxRows: 10 }}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="댓글 내용"
                  style={{ marginBottom: '2rem' }}
                />
              </Modal>
            </>
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
