import { TestReleasedNote } from '@components/ReleaseNote/ReleasedNoteAll/mock.tsx';
import { useParams } from 'react-router';
import SideDetailBar from '@components/SideDetailBar';
import SideBar from '@components/SideBar';
import HeaderBar from '@components/HeaderBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';

const ReleaseNoteDetail = () => {
  const Id = useParams();
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        {TestReleasedNote.map((note, index) => {
          if (note.key === Id.releaseId) {
            return (
              <div key={index}>
                <div>Version {note.key}</div>
                {note.title}
              </div>
            );
          }
        })}
      </Wrapper>
    </>
  );
};

export default ReleaseNoteDetail;
