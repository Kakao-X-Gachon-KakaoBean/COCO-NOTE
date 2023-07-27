import { BarDiv, LogoDiv, OthersDiv, TitleLink } from '@components/HeaderBar/styles.tsx';
import Notification from '@components/HeaderBar/Notification';
import MyInfo from '@components/HeaderBar/MyInfo';
import { useRecoilState } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useNavigate } from 'react-router-dom';

const HeaderBar = () => {
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const navigate = useNavigate();
  function waitForAnimation() {
    return new Promise(resolve => setTimeout(resolve, 550));
  }
  return (
    <>
      <BarDiv>
        <LogoDiv>
          <TitleLink
            onClick={async () => {
              setProjectInfoMenuOpen(false);
              setProjectInfoMenuOpen(false);
              await waitForAnimation();
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
