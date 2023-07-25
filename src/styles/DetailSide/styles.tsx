import styled from '@emotion/styled';

export const Wrapper = styled.div<{ open: boolean }>`
  width: 72%;
  height: 93vh;
  margin-top: 7%;
  margin-left: 28%;
  font-family: SCDream4;
  background-color: white;
  transform: translateX(${({ open }) => (open ? '0' : '-25%')});
  transition: transform 0.3s ease-out;
`;
