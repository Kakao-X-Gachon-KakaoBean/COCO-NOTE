import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import ReleasedNoteAll from '@components/ReleaseNote/ReleasedNoteAll';

const ReleaseNotePage = () => {
  return (
    <div>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ReleasedNoteAll />
      </Wrapper>
    </div>
  );
};

export default ReleaseNotePage;
