import { BarDiv, LogoDiv, OthersDiv, TitleLink } from '@components/HeaderBar/styles.tsx';
import Notification from '@components/HeaderBar/Notification';
import MyInfo from '@components/HeaderBar/MyInfo';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@states/ProjectState.ts';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { removeCookie } from '@utils/cookie.ts';
import { memberIdState } from '@states/userState.ts';

const HeaderBar = () => {
  const [projectInfoMenuOpen, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const resetMemberId = useResetRecoilState(memberIdState);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('accessToken') !== null);

  const redirectLogin = useCallback(() => {
    document.location.href = '/login';
  }, []);

  const onLogout = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      localStorage.removeItem('accessToken');
      resetMemberId();
      localStorage.removeItem('memberAtom');
      removeCookie('refreshToken');
      setIsLogin(false);
      document.location.href = '/';
    },
    [resetMemberId]
  );

  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
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
          <div>{!isLogin ? <div onClick={redirectLogin}>LogIn</div> : <div onClick={onLogout}>Logout</div>}</div>
          <Notification />
          <MyInfo />
        </OthersDiv>
      </BarDiv>
    </>
  );
};

export default HeaderBar;
