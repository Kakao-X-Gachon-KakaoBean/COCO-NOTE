import React, { ChangeEvent, FC, useCallback, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosError } from "axios";

import {
  Wrapper,
  CheckBtn,
  Correct,
  Form,
  EmailLabel,
  Error,
  Input,
  Div,
  Header,
  Button,
  InputKey,
  Label,
  InputKeyWithText,
} from "@components/PasswordModal/styles";
import { PaswwordModal } from "@components/PasswordModal/type";
import { useMutation } from "react-query";
import useInput from "../../hooks/useInput";

const SearchPassword: FC<PaswwordModal> = ({
  name,
  onChangeName,
  onClosePasswordModal,
  birth,
  onChangeBirth,
}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [email, onChangeEmail, setEmail] = useInput("");
  const [passwordToChange, , setPasswordToChange] = useInput("");
  const [checkPasswordToChange, , setCheckPasswordToChange] = useInput("");
  const [emailAuthKey, onChangeEmailAuthKey, seyAuthKey] = useInput("");
  const [failUseEmail, setFailUseEmail] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);
  const message = (message: string) => (
    <div style={{ fontSize: "1rem" }}>{message}</div>
  );
  //입력한 이메일로 인증번호 보내기
  const onSubmitEmail = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e?.preventDefault();
      const message = (message: string) => (
        <div style={{ fontSize: "1rem" }}>{message}</div>
      );

      if (!email || !email.trim()) return;

      axios
        .post(`${baseUrl}/emails`, { email }, { withCredentials: true })
        .then((response) => {
          setFailUseEmail(true);
          toast(message("메일로 인증번호가 발송되었습니다."), {
            type: "success",
          });
        })
        .catch((error) => {
          toast(message("메일 주소를 확인해주세요."), { type: "error" });
          setFailUseEmail(false);
          console.log(error.response);
        });
    },
    [email]
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordToChange(e.target.value);
      setMismatchError(e.target.value === checkPasswordToChange);
    },
    [passwordToChange, setPasswordToChange]
  );

  const onChangeCheckPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCheckPasswordToChange(e.target.value);
      setMismatchError(e.target.value === passwordToChange);
    },
    [passwordToChange, setCheckPasswordToChange]
  );

  const stopPropagation = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      e.stopPropagation();
    },
    []
  );

  const mutation = useMutation<
    string,
    AxiosError,
    {
      email: string;
      emailAuthKey: string;
      passwordToChange: string;
      checkPasswordToChange: string;
    }
  >(
    "modifyPassword",
    (data) =>
      axios
        .patch(`${baseUrl}/members/password`, data)
        .then((response) => response.data),
    {
      onMutate() {
        // setLogInError(false);
      },
      onSuccess() {
        toast(message("비밀번호가 변경 되었습니다."), {
          type: "success",
        });
        console.log("요청 성공");
      },
      onError(error) {
        // setLogInError(error.response?.data?.code === 401);
        toast(message("정보를 잘못 입력하셨습니다."), { type: "error" });
        console.log(error);
      },
    }
  );

  const onSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      const message = (message: string) => (
        <div style={{ fontSize: "1rem" }}>{message}</div>
      );

      if (email && emailAuthKey && passwordToChange && checkPasswordToChange) {
        mutation.mutate({
          email,
          emailAuthKey,
          passwordToChange,
          checkPasswordToChange,
        });
      }
    },
    [email, emailAuthKey, passwordToChange, checkPasswordToChange, mutation]
  );

  return (
    <Wrapper onClick={stopPropagation}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
      <Form>
        <Div>
          <Header>비밀번호 변경</Header>
        </Div>
        <button onClick={onClosePasswordModal}>X</button>
      </Form>

      <EmailLabel>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일"
        />
        <CheckBtn
          type="button"
          onClick={(e) => {
            onSubmitEmail(e);
          }}
        >
          이메일 인증
        </CheckBtn>
      </EmailLabel>

      <Label>
        <Input
          type="text"
          id="authKey"
          name="authKey"
          value={emailAuthKey}
          onChange={onChangeEmailAuthKey}
          placeholder="인증번호 입력"
        />
      </Label>
      <Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={passwordToChange}
          onChange={onChangePassword}
          placeholder="비밀번호"
        />
      </Label>
      <Label>
        <Input
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          value={checkPasswordToChange}
          onChange={onChangeCheckPassword}
          placeholder="비밀번호 확인"
        />
        {!mismatchError && checkPasswordToChange.length >= 1 && (
          <Error>비밀번호가 일치하지 않습니다!</Error>
        )}
        {mismatchError && checkPasswordToChange.length >= 1 && (
          <Correct>비밀번호가 일치합니다!</Correct>
        )}
      </Label>

      {/*{failUseEmail && !proveEmail && (*/}
      {(!mismatchError && checkPasswordToChange.length >= 1) ||
      (mismatchError && checkPasswordToChange.length >= 1) ? (
        <InputKeyWithText>
          <Form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <Button type="submit">비밀번호 변경</Button>
          </Form>
        </InputKeyWithText>
      ) : (
        <InputKey>
          <Form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <Button type="submit">비밀번호 변경</Button>
          </Form>
        </InputKey>
      )}
    </Wrapper>
  );
};

export default SearchPassword;
