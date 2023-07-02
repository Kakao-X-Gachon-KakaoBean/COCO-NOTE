import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Header = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  line-height: 77px;
  letter-spacing: 0.1em;
  text-align: center;
  font-family: "Pretendard-Regular";
`;

const submitButtonAnimation = keyframes`
  from {
    background-color: #b8c0c5;
  }

  to {
    background-color: #039ba1;
    color: white;
    border: none;
  }
`;

export const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  text-align: center;
  width: 29rem;
  height: 3rem;
  border-radius: 8px;
  color: #b8c0c5;
  outline: none;
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  border: none;
  &:hover {
    animation: ${submitButtonAnimation} 0.2s ease-in-out forwards;
  }
`;

export const SubHeader = styled.div`
  font-weight: 400;
  font-size: 1rem;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.15em;
  color: #343434;
  margin-bottom: 1rem;

  & div {
    color: #343434;
    & a {
      text-decoration: none;
      color: inherit;
      font-weight: bold;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const EmailLabel = styled.div`
  margin-bottom: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const EmailInput = styled.input`
  color: #969696;
  background: #ffffff;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #e6e8eb;
  border-radius: 8px;
  width: 22rem;
  height: 3rem;
  outline: none;
  font-size: 1.3rem;
  padding: 10px 15px 12px;
  margin-top: 0.9rem;
  margin-bottom: 0.3rem;
  :focus {
    border: 1px solid gray;
  }
  ::placeholder {
    font-size: 1rem;
    font-weight: 200;
    color: #969696;
  }
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
  width: 6rem;
  height: 3rem;
  background: #f2fcfc;
  border: 1px solid #b6e4e5;
  border-radius: 8px;
  outline: none;
  font-size: 0.8rem;
  font-weight: 700;
  color: #b6e4e5;
  cursor: pointer;
  margin-top: 0.9rem;
  margin-bottom: 0.3rem;
  &:hover {
    animation: ${checkButtonAnimation} 0.2s ease-in-out forwards;
  }
`;

export const Input = styled.input`
  color: #969696;
  background: #ffffff;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #e6e8eb;
  border-radius: 8px;
  width: 29rem;
  height: 3rem;
  outline: none;
  font-size: 1.3rem;
  padding: 10px 15px 12px;
  margin-top: 0.9rem;
  margin-bottom: 0.3rem;
  :focus {
    border: 1px solid gray;
  }
  ::placeholder {
    font-size: 1rem;
    font-weight: 200;
    color: #969696;
  }
`;

export const CheckLabel = styled.div`
  display: flex;
  gap: 2rem;
`;

const genderLabelAnimation = keyframes`
  to{
    background-color: black;
    color: white;
  }
`;

export const Label2 = styled.label`
  color: #969696;
  background-color: #e6e8eb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  border-radius: 8px;
  width: 13.6rem;
  height: 3rem;
  font-weight: 600;
  outline: none;
  font-size: 1.3rem;
  margin-top: 0.9rem;
  margin-bottom: 0.3rem;

  &:hover {
    animation: ${genderLabelAnimation} 0.2s ease-in-out forwards;
  }

  & input[type="radio"]:checked + span {
    color: white;
    background-color: black;
  }
`;

export const GenderSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 13.6rem;
  height: 3rem;
`;

export const InputGender = styled.input`
  :focus {
    border: 1px solid gray;
  }
  ::placeholder {
    font-size: 1.1rem;
    font-weight: 600;
    color: #6c747a;
  }
  &[type="radio"] {
    display: none;
  }
`;

export const Error = styled.div`
  color: red;
  font-weight: bold;
`;

export const Correct = styled.div`
  color: dodgerblue;
  font-weight: bold;
`;
