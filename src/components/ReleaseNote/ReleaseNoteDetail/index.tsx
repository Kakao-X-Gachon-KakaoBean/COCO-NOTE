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
import { useRecoilValue } from 'recoil';

const ReleaseNoteDetail = () => {
  const { releaseId } = useParams();
  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);

  const note: ReleasedNoteAll | undefined = TestReleasedNote.find(note => note.version === releaseId);

  if (!note) {
    return <div>릴리즈 노트가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper open={projectInfoMenuOpen}>
        <ReleasedNoteDiv>
          {note.editState ? <BulletinReleaseNoteDetail note={note} /> : <ReadOnlyReleaseNoteDetail note={note} />}
        </ReleasedNoteDiv>
      </Wrapper>
    </>
  );
};

export default ReleaseNoteDetail;
