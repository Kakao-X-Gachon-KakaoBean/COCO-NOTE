import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@states/ProjectState.ts';
import { useNavigate } from 'react-router-dom';
import { waitForAnimation } from '@utils/waitForAnimation.ts';

export const useExpiredPage = () => {
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const navigate = useNavigate();

  const goToNotification = async () => {
    initialSelectedProject();
    setProjectInfoMenuOpen(false);
    await waitForAnimation();
    navigate(-1);
  };

  return goToNotification;
};
