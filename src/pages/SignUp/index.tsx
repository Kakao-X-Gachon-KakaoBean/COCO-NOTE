import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Wrapper, Label } from "@pages/Login/styles.tsx";
import {
  Header,
  SubHeader,
  Input,
  CheckBtn,
  Form,
  LoginBtn,
  EmailLabel,
  EmailInput,
  Error,
  Correct,
} from "@pages/SignUp/styles";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { IUser } from "../../States/UserState";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "antd";
import useInput from "../../hooks/useInput.ts";

const SignUp = () => {
  const baseUrl = 1234;

  const [name, onChangeName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, , setPassword] = useInput("");
  const [checkPassword, , setCheckPassword] = useInput("");
  const [emailAuthKey, onChangeEmailAuthKey] = useInput("");

  const [failUseEmail, setFailUseEmail] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [mismatchError, setMismatchError] = useState(false);

  const mutation = useMutation<
    IUser,
    AxiosError,
    {
      name: string;
      email: string;
      password: string;
      checkPassword: string;
      emailAuthKey: string;
    }
  >(
    "user",
    (data) =>
      axios.post(`${baseUrl}/members`, data).then((response) => response.data),
    {
      onMutate() {
        setSignUpSuccess(false);
      },
      onSuccess() {
        setSignUpSuccess(true);
      },
      onError() {
        alert("양식을 알맞게 작성해주세요");
      },
    }
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value === checkPassword);
    },
    [password, setPassword]
  );

  const onChangeCheckPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCheckPassword(e.target.value);
      setMismatchError(e.target.value === password);
    },
    [password, setCheckPassword]
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name && email && password && checkPassword && emailAuthKey) {
        mutation.mutate({
          name,
          email,
          password,
          checkPassword,
          emailAuthKey,
        });
      }
    },
    [email, name, password, checkPassword, emailAuthKey, mutation]
  );

  // if (isLoading) {
  //   return <div>로딩중...</div>;
  // }

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
        .then(() => {
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

  return (
    <>
      <Wrapper>
        <ToastContainer
          position="top-right"
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
        <Header>회원가입</Header>
        <SubHeader>
          <div>
            이미{" "}
            <Link to={"/main"} style={{ color: "#039ba1", fontWeight: "bold" }}>
              COCO:NOTE
            </Link>{" "}
            회원이신가요?
          </div>
          <div>
            <Link to="/login">로그인</Link>
          </div>
        </SubHeader>
        <Form onSubmit={onSubmit}>
          <Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChangeName}
              placeholder="이름"
            />
          </Label>
          <EmailLabel>
            <EmailInput
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

          {failUseEmail && (
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
          )}
          <Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              placeholder="비밀번호"
            />
          </Label>
          <Label>
            <Input
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              value={checkPassword}
              onChange={onChangeCheckPassword}
              placeholder="비밀번호 확인"
            />
            {!mismatchError && checkPassword.length >= 1 && (
              <Error>비밀번호가 일치하지 않습니다!</Error>
            )}
            {mismatchError && checkPassword.length >= 1 && (
              <Correct>비밀번호가 일치합니다!</Correct>
            )}
          </Label>
          <LoginBtn type="submit">가입하기</LoginBtn>
        </Form>
      </Wrapper>
      <Modal
        title="Cocoa"
        closeIcon={" "}
        footer={[
          <Link key="submit" to="/login">
            <Button type="primary">로그인 하러 가기</Button>
          </Link>,
        ]}
        open={signUpSuccess}
        centered
      >
        <p>BeanBay의 회원이 되신 것을 환영합니다.</p>
      </Modal>
    </>
  );
};

export default SignUp;
