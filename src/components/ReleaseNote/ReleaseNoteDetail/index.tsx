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

const ReleaseNoteDetail = () => {
  const { releaseId } = useParams();

  const note: ReleasedNoteAll | undefined = TestReleasedNote.find(note => note.version === releaseId);

  if (!note) {
    return <div>Release note not found.</div>;
  }

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ReleasedNoteDiv>
          {note.editState ? <BulletinReleaseNoteDetail note={note} /> : <ReadOnlyReleaseNoteDetail note={note} />}
        </ReleasedNoteDiv>
      </Wrapper>
    </>
  );
};

export default ReleaseNoteDetail;
