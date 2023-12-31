import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import React, { useCallback, useState } from 'react';
import useInput from '../../hooks/useInput.ts';
import { CreateIssue } from '@type/IssueType.ts';
import {
  CreateIssueBox,
  CreateIssueHeader,
  CreateIssueInput,
  CreateIssueSubmit,
  CreateIssueTitle,
} from '@components/CreateIssue/styles.tsx';
import { Button } from 'antd';
import { useRecoilValueLoadable } from 'recoil';
import { ActivityIndicator } from '@components/ActivityIndicator';
import { Input } from '@components/EditIssue/styles.tsx';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useParams } from 'react-router';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { postIssue } from '@api/Issue/Issue.ts';

const CreateIssue = () => {
  const navigate = useNavigate();
  const [title, onChangeTitle] = useInput('');
  const [content, setContent] = useState<string | undefined>('**내용을 입력해주세요.**');

  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);
  const getBack = () => {
    navigate(-1);
  };

  const projectId: string | undefined = useParams().projectId;

  const postIssueMutation = useMutation<'이슈 생성 완료' | '이슈 생성 실패', AxiosError, CreateIssue>(
    'post issue',
    postIssue,
    {
      onSuccess: data => {
        if (data === '이슈 생성 완료') {
          toast.success('이슈를 생성하였습니다.');
          navigate(-1);
        } else {
          toast.error('이슈 생성에 실패하였습니다.');
        }
      },
      onError: error => {
        if (error.message === '공백일 수 없습니다') {
          toast.error('제목을 입력해주세요');
        }
      },
    }
  );

  const submitNewIssue = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!title && !content) {
        toast.error('모든 정보를 입력해주세요.');
        return;
      }
      if (!title) {
        toast.error('생성할 이슈 제목을 입력해주세요.');
        return;
      }

      if (!content) {
        toast.error('생성할 이슈 내용을 입력해주세요.');
        return;
      }
      postIssueMutation.mutate({ title, content, projectId });
    },
    [postIssueMutation, title, content, projectId]
  );

  let contents = null;
  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <CreateIssueBox>
              <CreateIssueHeader>
                <Button onClick={getBack}>뒤로 가기</Button>
              </CreateIssueHeader>
              <CreateIssueTitle>
                <Input type="text" id="title" name="title" value={title} onChange={onChangeTitle} placeholder="제목" />
              </CreateIssueTitle>
              <CreateIssueInput>
                <div data-color-mode="light">
                  <MDEditor height={500} value={content} onChange={setContent} />
                </div>
              </CreateIssueInput>
              <CreateIssueSubmit>
                <Button onClick={submitNewIssue}>제출</Button>
              </CreateIssueSubmit>
            </CreateIssueBox>
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

export default CreateIssue;
