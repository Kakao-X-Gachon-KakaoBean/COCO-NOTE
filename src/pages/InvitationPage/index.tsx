import { useParams } from 'react-router';
import React, { useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
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
import fetcher from '@utils/fetcher.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { inviteMember } from '@/Api/Invitation/Invitation.ts';

const InvitationPage = () => {
  const projectKey: any = useParams().projectkey;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const message = (message: string) => <div style={{ fontSize: '1rem' }}>{message}</div>;

  const { data } = useQuery<any>(['invitatintitle'], () =>
    fetcher({
      queryKey: `${BACKEND_URL}/projects/title?projectSecretKey=${projectKey}`,
    })
  );

  const inviteMemberMutation = useMutation<
    '참여 완료' | '참여 실패',
    AxiosError,
    { projectSecretKey: string | undefined }
  >('invite project', inviteMember, {
    onSuccess: data => {
      if (data === '참여 완료') {
        toast(message('참여가 완료되었습니다.'), {
          type: 'success',
        });
      } else {
        toast(message('참여에 실패하였습니다.'), { type: 'error' });
      }
    },
    onError: () => {
      alert('서버와 연결이 되어있지 않습니다.');
    },
  });

  const onSubmitKey = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e?.preventDefault();

      inviteMemberMutation.mutate({ projectSecretKey: projectKey });
    },
    [inviteMemberMutation, projectKey]
  );

  const onCancle = () => {
    navigate('/');
  };

  return (
    <>
      <Wrapper>
        <HeaderBar />
        <ImageBox>
          <Img src={logoImage} alt="logo" />
        </ImageBox>
        <ProjectName>{data?.projectTitle}</ProjectName>
        <ProjectExplain>{data?.projectTitle}에서 초대를 하였습니다.</ProjectExplain>
        <ButtonBox>
          <Button onClick={onSubmitKey}>수락하기</Button>
          <NoButton onClick={onCancle}>수락 안함</NoButton>
        </ButtonBox>
      </Wrapper>
    </>
  );
};

export default InvitationPage;
