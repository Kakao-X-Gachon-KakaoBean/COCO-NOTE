import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button, Modal, Typography } from 'antd';
import {
  BulletinDiv,
  DeleteModalBtnDiv,
  EditingText,
  ReleaseNoteHeaderBottom,
  ReleaseNoteHeaderDiv,
  ReleaseNoteHeaderMiddle,
  ReleaseNoteHeaderTop,
  ReleaseNoteHeaderTopLeft,
  ReleaseNoteHeaderTopRight,
} from '@/components/ReleaseNote/ReleaseNoteDetail/styles.tsx';
import {
  MarkdownParagraph,
  ReleasedNoteDate,
  ReleasedNoteParagraph,
  ReleasedNoteText,
  ReleasedNoteTitle,
} from '@/components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import ConvertDate from '@/components/ReleaseNote/ConvertDate';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValueLoadable } from 'recoil';
import { projectInfoMenuOpenState } from '@/states/ProjectState.ts';
import { ActivityIndicator } from '@/components/ActivityIndicator';
import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { Wrapper } from '@/styles/DetailSide/styles.tsx';
import { useMutation, useQuery } from 'react-query';
import fetcher from '@/utils/fetcher.ts';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { distributeManuscript, verifyEditPermissions } from '@/api/ReleaseNote/ManuScript.ts';
import { LastEditedMemberDiv } from '@/components/ReleaseNote/ReleaseNoteDetail/SingleManuscript/styles.tsx';
import { SingleManuscriptInfo } from '@/types/SingleManuScriptType.ts';
import { BACKEND_URL } from '@/api';

const SingleManuscript: React.FC = () => {
  const navigate = useNavigate();
  const headerParam = useParams();
  const scriptId = headerParam.releaseId;
  const projectId = headerParam.projectId;
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);
  const [manuscriptData, setManuscriptData] = useState<SingleManuscriptInfo>();
  const [distributeModalOpen, setDistributeModalOpen] = useState<boolean>(false);
  useQuery<SingleManuscriptInfo>(
    ['manuscript', scriptId],
    () =>
      fetcher({
        queryKey: `${BACKEND_URL}/manuscripts/${scriptId}`,
      }),
    {
      onSuccess: data => {
        setManuscriptData(data);
      },
      onError: () => {
        toast.error('오류가 발생했습니다. 화면을 새로고침 해주세요.');
      },
    }
  );
  const verifyEditManuscriptMutation = useMutation(verifyEditPermissions, {
    onSuccess: data => {
      if (data === '원고 수정 권한 확인 실패') {
        toast.error('현재 다른 사용자가 이 릴리즈노트를 수정 중이거나, 서버에 오류가 있습니다.');
      } else {
        navigate('edit', { state: data });
      }
    },
    onError: () => {
      toast.error('권한을 받아오는데 문제가 있습니다.');
    },
  });
  const distributeManuscriptMutation = useMutation(distributeManuscript, {
    onSuccess: data => {
      if (data === '원고 배포 성공') {
        toast.success('해당 릴리즈 노트를 배포하였습니다.');
        navigate(`/projects/${projectId}/release-notes`);
      } else {
        toast.error('릴리즈 노트 배포에 실패했습니다. 화면을 새로고침 해주세요.');
      }
    },
  });

  let contents = null;
  const editReleaseNote = () => {
    verifyEditManuscriptMutation.mutate(scriptId ?? '');
  };
  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <>
              <Modal
                centered
                title={'릴리즈 노트 삭제'}
                open={distributeModalOpen}
                onCancel={() => setDistributeModalOpen(false)}
                onOk={() => setDistributeModalOpen(false)}
                footer={
                  <DeleteModalBtnDiv>
                    <Button
                      type={'primary'}
                      onClick={() => {
                        if (
                          manuscriptData?.manuscriptTitle &&
                          manuscriptData?.manuscriptContent &&
                          manuscriptData?.manuscriptVersion &&
                          projectId
                        ) {
                          distributeManuscriptMutation.mutate({
                            title: manuscriptData?.manuscriptTitle,
                            content: manuscriptData?.manuscriptContent,
                            version: manuscriptData?.manuscriptVersion,
                            projectId: projectId,
                          });
                          setDistributeModalOpen(false);
                        } else {
                          toast.error('데이터를 불러올 수 없습니다.');
                        }
                      }}
                    >
                      배포하기
                    </Button>
                  </DeleteModalBtnDiv>
                }
              >
                <div>{manuscriptData?.manuscriptTitle}</div>
                <div>위 릴리즈 노트를 배포하시겠습니까?</div>
              </Modal>
              <Typography>
                <ReleasedNoteParagraph>
                  <ReleaseNoteHeaderDiv>
                    <ReleaseNoteHeaderTop>
                      <ReleaseNoteHeaderTopLeft>
                        <ReleasedNoteTitle>{manuscriptData?.manuscriptTitle}</ReleasedNoteTitle>
                        {manuscriptData?.manuscriptStatus === 'Modifying' ? (
                          <EditingText>
                            <FontAwesomeIcon icon={faCircle} size={'xs'} />
                            &nbsp;현재 다른 사용자가 작성 중입니다
                          </EditingText>
                        ) : (
                          <></>
                        )}
                      </ReleaseNoteHeaderTopLeft>
                      <ReleaseNoteHeaderTopRight>
                        <Button onClick={() => editReleaseNote()}>수정하기</Button>
                        <Button type={'primary'} onClick={() => setDistributeModalOpen(true)}>
                          릴리즈 노트 배포
                        </Button>
                      </ReleaseNoteHeaderTopRight>
                    </ReleaseNoteHeaderTop>
                    <ReleaseNoteHeaderMiddle>
                      <ReleasedNoteText>{'Version ' + manuscriptData?.manuscriptVersion}</ReleasedNoteText>
                    </ReleaseNoteHeaderMiddle>
                    <ReleaseNoteHeaderBottom>
                      <ReleasedNoteDate>{ConvertDate(manuscriptData?.createdAt ?? '')}</ReleasedNoteDate>
                    </ReleaseNoteHeaderBottom>
                  </ReleaseNoteHeaderDiv>
                  <MarkdownParagraph>
                    <BulletinDiv data-color-mode="light">
                      <MDEditor.Markdown
                        source={manuscriptData?.manuscriptContent}
                        style={{ fontFamily: 'SCDream4' }}
                      />
                    </BulletinDiv>
                  </MarkdownParagraph>
                  <LastEditedMemberDiv>
                    가장 마지막에 수정한 멤버: {manuscriptData?.lastEditedMemberName}
                  </LastEditedMemberDiv>
                </ReleasedNoteParagraph>
              </Typography>
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

export default SingleManuscript;
