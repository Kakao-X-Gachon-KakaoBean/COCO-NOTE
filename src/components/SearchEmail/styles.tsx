import styled from "@emotion/styled";
import { Input } from "antd";
import { keyframes } from "@emotion/react";

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;

  width: 30vw;
  height: 35vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transform: translate(-50%, -50%);
  animation-duration: 0.3s;
  animation-name: "fadeIn";
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

    font-size: 1rem;
  }
`;

export const InputKey = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

export const EmailInput = styled.input`
  color: #969696;
  background-color: #ffffff;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0 4px 4px 0 #00000040;
  border: 1px solid #969696;
  border-radius: 12px;
  width: 20rem;
  height: 3rem;
  outline: none;
  font-size: 1.3rem;
  padding: 10px 15px 12px;
  margin-bottom: 0.5rem;
  :focus {
    border: 1px solid gray;
  }
  ::placeholder {
    font-size: 1.1rem;
    font-weight: 300;
    color: #969696;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const Header = styled.header`
  font-size: 1.3rem;
  font-weight: bold;
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
export const Button = styled.button`
  color: #b8c0c5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2.3rem;
  box-shadow: 0 4px 4px 0 #00000040;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  margin-top: 1.5rem;
  &:hover {
    animation: ${buttonAnimation} 0.2s ease-in-out forwards;
  }
`;

export const EmailHeader = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
export const EmailBody = styled.div`
  font-size: 1rem;
  width: 15rem;
  height: 6rem;
  border: 1px solid #efefef;
  margin-top: 0.5rem;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0.2rem 1rem;
  flex-direction: column;
`;

export const InputInfo = styled(Input)`
  box-sizing: border-box;
  width: 15rem;
  height: 2rem;
  outline: none;
  font-size: 1rem;
  margin-top: 0.4rem;
`;
