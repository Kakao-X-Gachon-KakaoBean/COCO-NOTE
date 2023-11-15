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
import logoImage from '@images/logoImage.png';
import fetcher from '@utils/fetcher.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { inviteMember } from '@api/Invitation/Invitation.ts';
import { InvitationType } from '@type/InvitationType.ts';
import InvitationHeader from '@components/InvitationHeader';
import { BACKEND_URL } from '@api';

const InvitationPage = () => {
  const projectKey: any = useParams().projectkey;
  const navigate = useNavigate();

  const { data } = useQuery<InvitationType>(['invitatintitle'], () =>
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
        toast.success('참여가 완료되었습니다.');
      } else {
        toast.error('참여에 실패하였습니다.');
      }
    },
    onError: () => {
      toast.error('서버와 연결이 되어있지 않습니다.');
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
        <InvitationHeader />
        <ImageBox>
          <Img src={'logoImage.svg'} alt={'logoImage'} />
        </ImageBox>
        <ProjectName>{data?.projectTitle}</ProjectName>
        <ProjectExplain>{data?.projectTitle}에서 초대를 하였습니다.</ProjectExplain>
        <ButtonBox>
          <Button onClick={onSubmitKey}>수락하기</Button>
          <NoButton onClick={onCancle}>거절하기</NoButton>
        </ButtonBox>
      </Wrapper>
    </>
  );
};

export default InvitationPage;
