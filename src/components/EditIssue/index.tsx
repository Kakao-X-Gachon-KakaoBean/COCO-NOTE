import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { Wrapper } from '@/styles/DetailSide/styles.tsx';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import useInput from '../../hooks/useInput.ts';
import { EditIssueBox, EditIssueHeader, EditIssueInput, EditIssueSubmit, EditIssueText, Input } from './styles.tsx';
import { useRecoilValueLoadable } from 'recoil';
import { projectInfoMenuOpenState } from '@/states/ProjectState.ts';
import { ActivityIndicator } from '@/components/ActivityIndicator';
import { useLocation } from 'react-router';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { EditIssue } from '@/types/IssueType.ts';
import { editIssue } from '@/api/Issue/Issue.ts';

const EditIssue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { IssueData } = location.state;
  const issueId = IssueData.issue.issueId;
  const queryClient = useQueryClient();

  const [title, onChangeTitle] = useInput<string>(IssueData.issue.title);
  const [content, setContent] = useState<string | undefined>(IssueData.issue.content);
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);

  const editIssueMutation = useMutation<'이슈 수정 성공' | '이슈 수정 실패', AxiosError, EditIssue>(
    'editIssue',
    (data: EditIssue) => editIssue(issueId, data),
    {
      onSuccess: data => {
        if (data === '이슈 수정 성공') {
          toast.success('수정 완료하였습니다.');
          navigate(-1);
          queryClient.invalidateQueries('detatilIssue');
        } else {
          toast.error('양식을 제대로 입력해주세요.');
        }
      },
      onError: () => {
        toast.error('서버와 연결이 되어있지 않습니다.');
      },
    }
  );

  const submitIssue = useCallback(
    (e: any) => {
      e.preventDefault();

      if (!title && !content) {
        toast.error('모든 정보를 입력해주세요.');
        return;
      }
      if (!title) {
        toast.error('수정할 이슈 제목을 입력해주세요.');
        return;
      }

      if (!content) {
        toast.error('수정할 이슈 내용을 입력해주세요.');
        return;
      }

      editIssueMutation.mutate({ title: title, content: content });
    },
    [title, content, editIssueMutation]
  );

  const getBack = () => {
    navigate(-1);
  };

  let contents = null;

  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <EditIssueBox>
              <EditIssueHeader>
                <div>이슈 수정</div>
                <Button onClick={getBack}>뒤로 가기</Button>
              </EditIssueHeader>
              <EditIssueInput>
                <Input type="text" id="title" name="title" value={title} onChange={onChangeTitle} placeholder="제목" />
              </EditIssueInput>
              <EditIssueText data-color-mode="light">
                <MDEditor height={500} value={content} onChange={setContent} />
              </EditIssueText>
              <EditIssueSubmit>
                <Button onClick={submitIssue}>수정하기</Button>
              </EditIssueSubmit>
            </EditIssueBox>
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

export default EditIssue;
