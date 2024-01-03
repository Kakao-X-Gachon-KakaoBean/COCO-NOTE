import { BarDiv, LogoDiv, OthersDiv, TitleLink } from '@components/HeaderBar/styles.tsx';
import Notification from '@components/HeaderBar/Notification';
import MyInfo from '@components/HeaderBar/MyInfo';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@states/ProjectState.ts';
import { useNavigate } from 'react-router-dom';
import { waitForAnimation } from '@utils/waitForAnimation.ts';
import { useRouteMain } from '@hooks/UseRouteMain.ts';

const HeaderBar = () => {
  const handleTitleClick = useRouteMain();

  return (
    <>
      <BarDiv>
        <LogoDiv>
          <TitleLink onClick={handleTitleClick}>COCONOTE</TitleLink>
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
