import styled from '@emotion/styled';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right bottom, white, #e2f0d9);
  overflow: hidden;
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
  font-size: 3rem;
`;

export const ProjectNameDiv = styled.div`
  font-family: SCDream6;
  font-size: 5vw;
`;

export const ExplainDiv = styled.div`
  font-family: SCDream3;
  font-size: 2vw;
  text-align: center;
  margin-top: 9%;
`;

export const BtnLink = styled(Link)`
  margin-top: 5%;
`;
export const LoginBtn = styled(Button)`
  background-color: white;
  color: #00b050;
  border-color: #00b050;
  font-family: SCDream3;

  &:hover {
    border-color: #00b050 !important;
    color: white !important;
    background-color: #00b050 !important;
  }
`;
