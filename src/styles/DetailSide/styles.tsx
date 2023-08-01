import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { projectInfoMenuOpenState } from '@/states/ProjectState.ts';

const projectINfoMenuOpen = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const state = useRecoilValue(projectInfoMenuOpenState);
  return state;
};

export const Wrapper = styled.div`
  width: 72%;
  height: 93vh;
  margin-top: 7%;
  margin-left: 28%;
  font-family: SCDream4;
  transform: translateX(${() => (projectINfoMenuOpen() ? '0' : '-25%')});
  transition: transform 0.3s ease-out;
`;
