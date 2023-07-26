import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import ReleasedNoteAll from '@components/ReleaseNote/ReleasedNoteAll';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useRecoilValue } from 'recoil';

const ReleaseNotePage = () => {
  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);
  return (
    <div>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper open={projectInfoMenuOpen}>
        <ReleasedNoteAll />
      </Wrapper>
    </div>
  );
};

export default ReleaseNotePage;
