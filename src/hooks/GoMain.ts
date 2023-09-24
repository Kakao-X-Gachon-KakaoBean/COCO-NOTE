import { useResetRecoilState, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { projectInfoMenuOpenState, SelectedProjectState } from '@states/ProjectState.ts';
import { waitForAnimation } from '@/hooks/waitForAnimation.ts';

export const GoMain = () => {
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const navigate = useNavigate();

  const GotoMain = async () => {
    initialSelectedProject();
    setProjectInfoMenuOpen(false);
    await waitForAnimation();
    navigate('/main');
  };

  return GotoMain;
};
