import { useParams } from 'react-router';
import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { ProjectKey } from '@states/ProjectState.ts';
import {
  Button,
  ButtonBox,
  ImageBox,
  Img,
  NoButton,
  ProjectExplain,
  ProjectName,
  Wrapper,
} from '@pages/InvitationPage/styles.tsx';
import logoImage from '@/images/logoImage.png';
import HeaderBar from '@components/HeaderBar';

const InvitationPage = () => {
  const projectKey: string | undefined = useParams().projectkey;

  const participateProject = useMutation<ProjectKey, AxiosError, { projectSecretKey: string | undefined }>(
    'participateProject',
    data =>
      axios
        .post(`http://localhost:8080/projects/members`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          withCredentials: true,
        })
        .then(response => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        console.log(data);
        alert('성공');
      },
      onError(error) {
        console.log(error);
        alert('전송에 실패하였습니다.');
      },
    }
  );

  const onSubmitKey = useCallback(
    (e: any) => {
      e.preventDefault();
      participateProject.mutate({ projectSecretKey: projectKey });
    },
    [projectKey, participateProject]
  );

  return (
    <>
      <Wrapper>
        <HeaderBar />
        <ImageBox>
          <Img src={logoImage} alt="logo" />
        </ImageBox>
        <ProjectName>COCONOTE</ProjectName>
        <ProjectExplain>프로젝트 들어갈래?</ProjectExplain>
        <ButtonBox>
          <Button onClick={onSubmitKey}>수락하기</Button>
          <NoButton>수락 안함</NoButton>
        </ButtonBox>
      </Wrapper>
    </>
  );
};

export default InvitationPage;
