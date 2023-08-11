import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { Button, Input } from 'antd';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import {
  EditManuscriptDiv,
  Editor,
  TemporarySave,
  TitleVersionInput,
  TopHeaderInfo,
} from '@components/ReleaseNote/ReleaseNoteEdit/styles.tsx';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useRecoilValueLoadable } from 'recoil';
import { ActivityIndicator } from '@components/ActivityIndicator';
import { useLocation, useParams } from 'react-router';
import { ManuscriptEdit } from '@components/ReleaseNote/ReleaseNoteEdit/type.ts';
import { saveEditedManuscript } from '@/Api/ReleaseNote/ManuScript.ts';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ReleaseNoteEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const headerParam = useParams();
  const scriptId = headerParam.releaseId;
  const manuscriptInfo = location.state as ManuscriptEdit;
  const [title, setTitle] = useState(manuscriptInfo?.manuscriptTitle);
  const [version, setVersion] = useState(manuscriptInfo?.manuscriptVersion);
  const [value, setValue] = useState<string | undefined>(
    manuscriptInfo?.manuscriptContent ?? '**내용을 입력해주세요.**'
  );
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);
  const saveEditedManuscriptMutation = useMutation(saveEditedManuscript, {
    onSuccess: data => {
      if (data === '원고 수정 성공') {
        toast.success('수정하신 릴리즈 노트가 반영되었습니다.');
        navigate(-1);
      } else {
        toast.error('릴리즈 노트 저장에 문제가 발생하였습니다. 새로고침하여 재시작해주세요.');
      }
    },
  });
  let contents = null;

  const saveManuscript = () => {
    saveEditedManuscriptMutation.mutate({
      manuscriptId: scriptId ?? '',
      title: title,
      version: version,
      content: value ?? '',
    });
    console.log('saved');
  };

  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <EditManuscriptDiv>
              <TitleVersionInput>
                <TopHeaderInfo>
                  <div>제목</div>
                  <Input
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    placeholder={'제목을 입력해주세요'}
                  />
                </TopHeaderInfo>
                <TopHeaderInfo>
                  <div>버전</div>
                  <Input
                    value={version}
                    onChange={event => setVersion(event.target.value)}
                    placeholder={'버전을 입력해주세요'}
                  />
                </TopHeaderInfo>
              </TitleVersionInput>
              <Editor data-color-mode="light">
                <MDEditor height={'60vh'} value={value} onChange={setValue} />
              </Editor>
              <TemporarySave>
                <Button type="primary" onClick={() => saveManuscript()}>
                  저장하기
                </Button>
              </TemporarySave>
            </EditManuscriptDiv>
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

export default ReleaseNoteEdit;
