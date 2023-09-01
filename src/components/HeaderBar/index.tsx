import { BarDiv, LogoDiv, OthersDiv, TitleLink } from '@/components/HeaderBar/styles.tsx';
import Notification from '@/components/HeaderBar/Notification';
import MyInfo from '@/components/HeaderBar/MyInfo';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@/states/ProjectState.ts';
import { useNavigate } from 'react-router-dom';
import { waitForAnimation } from '@/hooks/waitForAnimation.ts';

const HeaderBar = () => {
  const [projectInfoMenuOpen, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);

  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const navigate = useNavigate();

  return (
    <>
      <BarDiv>
        <LogoDiv>
          <TitleLink
            onClick={async () => {
              initialSelectedProject();
              setProjectInfoMenuOpen(false);
              if (projectInfoMenuOpen) {
                await waitForAnimation();
              }
              navigate('/main');
            }}
          >
            COCONOTE
          </TitleLink>
        </LogoDiv>
        <OthersDiv>
          <Notification />
          <MyInfo />
        </OthersDiv>
      </BarDiv>
    </>
  );
};

export default HeaderBar;
