import { useResetRecoilState, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { projectInfoMenuOpenState, SelectedProjectState } from '@states/ProjectState.ts';
import { waitForAnimation } from '@utils/waitForAnimation.ts';

export const useRouteMain = () => {
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const navigate = useNavigate();

  const executeGoToMain = async () => {
    initialSelectedProject();
    setProjectInfoMenuOpen(false);
    await waitForAnimation();
    navigate('/main');
  };

  return executeGoToMain;
};
