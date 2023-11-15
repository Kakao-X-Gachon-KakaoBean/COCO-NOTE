import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@/states/ProjectState.ts';
import { useNavigate } from 'react-router-dom';
import { waitForAnimation } from '@/hooks/waitForAnimation.ts';

export const ExpiredPage = () => {
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const navigate = useNavigate();

  const GoNotification = async () => {
    initialSelectedProject();
    setProjectInfoMenuOpen(false);
    await waitForAnimation();
    navigate(-1);
  };

  return GoNotification;
};
