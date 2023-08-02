import { BarDiv, LogoDiv, OthersDiv, TitleLink } from '@components/HeaderBar/styles.tsx';
import Notification from '@components/HeaderBar/Notification';
import MyInfo from '@components/HeaderBar/MyInfo';
import { useRecoilState } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

const HeaderBar = () => {
  const [projectInfoMenuOpen, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('accessToken') !== null);

  const redirectLogin = useCallback(() => {
    document.location.href = '/login';
  }, []);

  const onLogout = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    setIsLogin(false);
    document.location.href = '/';
  }, []);

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
