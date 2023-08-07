import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 1rem;
  background-color: #ffffff;
`;

export const ImageBox = styled.div``;

export const Img = styled.img`
  width: 10rem;
  height: 10rem;
`;

export const ProjectName = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

export const ProjectExplain = styled.div`
  font-size: 1.1rem;
  color: #a1a6aa;
`;
export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const buttonAnimation = keyframes`
  from {
    background-color: #3B81FA;
  }

  to {
    background-color: #206ff7;
    color: white;
    border: none;
  }
`;

export const Button = styled.button`
  color: white;
  background-color: #3b81fa;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2.7rem;
  box-shadow: 0 4px 4px 0 #00000040;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  margin-top: 1.5rem;
  &:hover {
    animation: ${buttonAnimation} 0.2s ease-in-out forwards;
  }
`;

export const NoButton = styled.div`
  color: #a1a6aa;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2.7rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1.5rem;
`;
