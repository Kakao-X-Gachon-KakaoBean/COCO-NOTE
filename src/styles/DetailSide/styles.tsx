import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
export const Wrapper = styled.div`
  width: ${() => (useRecoilValue(projectInfoMenuOpenState) ? '72vw' : '91vw')};
  height: 88vh;
  margin-top: 10.3vh;
  margin-left: ${() => (useRecoilValue(projectInfoMenuOpenState) ? '28vw' : '8vw')};
  font-family: SCDream4;
  background-color: white;
`;
