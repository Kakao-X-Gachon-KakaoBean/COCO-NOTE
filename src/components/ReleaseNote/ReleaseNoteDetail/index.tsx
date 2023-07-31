import { useParams } from 'react-router-dom';
import { TestReleasedNote } from '@components/ReleaseNote/ReleasedNoteAll/mock.tsx';
import ReadOnlyReleaseNoteDetail from './ReadOnlyReleaseNoteDetail';
import BulletinReleaseNoteDetail from './BulletinReleaseNoteDetail';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ReleasedNoteDiv } from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import { ReleasedNoteAll } from '@components/ReleaseNote/ReleasedNoteAll/type.ts';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useRecoilValueLoadable } from 'recoil';
import { ActivityIndicator } from '@components/ActivityIndicator';

const ReleaseNoteDetail = () => {
  const { releaseId } = useParams();
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);

  const note: ReleasedNoteAll | undefined = TestReleasedNote.find(note => note.version === releaseId);

  if (!note) {
    return <div>릴리즈 노트가 존재하지 않습니다.</div>;
  }

  let contents = null;

  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <ReleasedNoteDiv>
              {note.editState ? <BulletinReleaseNoteDetail note={note} /> : <ReadOnlyReleaseNoteDetail note={note} />}
            </ReleasedNoteDiv>
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

export default ReleaseNoteDetail;
