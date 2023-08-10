import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Typography, Button, Modal } from 'antd';
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
} from '@components/ReleaseNote/ReleaseNoteDetail/styles.tsx';
import {
  MarkdownParagraph,
  ReleasedNoteDate,
  ReleasedNoteParagraph,
  ReleasedNoteText,
  ReleasedNoteTitle,
} from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import { SingleManuscript } from '@components/ReleaseNote/ReleaseNoteDetail/SingleReleaseNote/type.ts';
import ConvertDate from '@components/ReleaseNote/ConvertDate';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValueLoadable } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { ActivityIndicator } from '@components/ActivityIndicator';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { useQuery } from 'react-query';
import fetcher from '@utils/fetcher.ts';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const SingleManuscript: React.FC = () => {
  const navigate = useNavigate();
  const headerParam = useParams();
  const scriptId = headerParam.releaseId;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);
  const [manuscriptData, setManuscriptData] = useState<SingleManuscript>();
  useQuery<SingleManuscript>(
    ['manuscript', scriptId],
    () =>
      fetcher({
        queryKey: `http://localhost:8080/manuscripts/${scriptId}`,
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

  let contents = null;
  const editReleaseNote = () => {
    navigate('edit');
  };
  const deleteReleaseNote = () => {
    // 릴리즈 노트 삭제 검증 후 모달 종료
    setDeleteModalOpen(false);
  };
  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <>
              <Typography>
                <Modal
                  centered
                  title={'릴리즈 노트 삭제'}
                  open={deleteModalOpen}
                  onCancel={() => setDeleteModalOpen(false)}
                  onOk={() => setDeleteModalOpen(false)}
                  footer={
                    <DeleteModalBtnDiv>
                      <Button type={'primary'} danger onClick={() => deleteReleaseNote}>
                        삭제하기
                      </Button>
                    </DeleteModalBtnDiv>
                  }
                >
                  <div>정말 이 릴리즈 노트를 삭제하시겠습니까?</div>
                </Modal>
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
                        <Button danger onClick={() => setDeleteModalOpen(true)}>
                          삭제
                        </Button>
                        <Button onClick={() => editReleaseNote()}>수정하기</Button>
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
                  <div>가장 마지막에 수정한 멤버</div>
                  <div>{manuscriptData?.lastEditedMemberName}</div>
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
