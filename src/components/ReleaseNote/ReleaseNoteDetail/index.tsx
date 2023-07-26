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
import { useEffect, useState } from 'react';
import { ActivityIndicator } from '@components/ActivityIndicator';

const ReleaseNoteDetail = () => {
  const { releaseId } = useParams();
  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!projectInfoMenuOpen) {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 550);
    }
  }, [projectInfoMenuOpen]);

  const note: ReleasedNoteAll | undefined = TestReleasedNote.find(note => note.version === releaseId);

  if (!note) {
    return <div>릴리즈 노트가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      {isVisible ? (
        <Wrapper>
          <ReleasedNoteDiv>
            {note.editState ? <BulletinReleaseNoteDetail note={note} /> : <ReadOnlyReleaseNoteDetail note={note} />}
          </ReleasedNoteDiv>
        </Wrapper>
      ) : (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      )}
    </>
  );
};

export default ReleaseNoteDetail;
