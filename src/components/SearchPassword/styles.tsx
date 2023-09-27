import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;

  width: 30vw;
  min-width: 400px;
  height: 60vh;
  min-height: 180px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;

  transform: translate(-50%, -50%);
  animation-duration: 0.3s;
  animation-name: 'fadeIn';
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
  }

  & > form > button {
    border: none;
    background-color: inherit;

    position: absolute;
    top: 1rem;
    right: 1rem;

    font-size: 2rem;
  }
`;

export const InputKey = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
`;

export const InputKeyWithText = styled.div`
  display: flex;
  justify-content: center;
`;

const checkButtonAnimation = keyframes`
    to{
      background-color: #039ba1;
      color: white;
      border: none;
    }
`;

export const CheckBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  height: 5vh;
  background: #f2fcfc;
  border: 1px solid #b6e4e5;
  border-radius: 8px;
  outline: none;
  font-size: 0.8vw;
  font-weight: 700;
  color: #b6e4e5;
  cursor: pointer;
  &:hover {
    animation: ${checkButtonAnimation} 0.2s ease-in-out forwards;
  }
`;

export const EmailLabel = styled.div`
  display: flex;
  width: 25vw;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.header`
  font-size: 1.3vw;
  font-weight: bold;
  margin: 1vh 0 5vh 0;
`;

export const Label = styled.div`
  & span {
    text-align: left;
    font-size: 15px;
    cursor: pointer;
    font-weight: 700;
    width: 10vw;
  }
`;

const buttonAnimation = keyframes`
  from {
    background-color: #f1f3f5;
  }

  to {
    background-color: #039ba1;
    color: white;
    border: none;
  }
`;

const buttonRollbackAnimation = keyframes`
  from {
    background-color: #039ba1;
    color: white;
    border: none;
  }

  to {
    background-color: #f1f3f5;
  }
`;

export const Button = styled.button<{ isChangePasswordBtnActivate: boolean }>`
  color: #b8c0c5;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  text-align: center;
  width: 10rem;
  height: 3rem;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  border: none;
  ${props =>
    props.isChangePasswordBtnActivate &&
    css`
      animation: ${buttonAnimation} 0.2s ease-in-out forwards;
    `}
  ${props =>
    !props.isChangePasswordBtnActivate &&
    css`
      animation: ${buttonRollbackAnimation} 0.2s ease-in-out forwards;
    `}
  &:hover {
    animation: ${buttonAnimation} 0.2s ease-in-out forwards;
  }
`;

export const Error = styled.div`
  color: red;
  font-weight: bold;
  font-size: small;
`;

export const Correct = styled.div`
  color: dodgerblue;
  font-weight: bold;
  font-size: small;
`;

export const Input = styled.input`
  box-sizing: border-box;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid rgb(194, 194, 194);
  width: 25vw;
  height: 5vh;
  outline: none;
  font-size: 1vw;
  margin-bottom: 0.5vh;
`;
