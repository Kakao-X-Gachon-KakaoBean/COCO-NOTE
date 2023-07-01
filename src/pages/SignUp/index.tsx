import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Wrapper, Label } from "@pages/LogIn/styles";
import {
  Header,
  SubHeader,
  Input,
  CheckBtn,
  Form,
  InputGender,
  LoginBtn,
  Label2,
  CheckLabel,
  EmailLabel,
  EmailInput,
  Error,
  Correct,
  GenderSpan,
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
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [name, onChangeName, setName] = useInput("");
  const [email, onChangeEmail, setEmail] = useInput("");
  const [birth, onchangeBirth, setBirthDay] = useInput("");
  const [age, onChangeAge, setAge] = useInput(0);
  const [gender, onChangeGender, setGender] = useInput("");
  const [password, , setPassword] = useInput("");
  const [checkPassword, , setCheckPassword] = useInput("");
  const [emailAuthKey, onChangeEmailAuthKey, seyAuthKey] = useInput("");

  const [failUseEmail, setFailUseEmail] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const [mismatchError, setMismatchError] = useState(false);

  const today = new Date();
  const mutation = useMutation<
    IUser,
    AxiosError,
    {
      name: string;
      age: number;
      gender: string;
      email: string;
      password: string;
      checkPassword: string;
      birth: string;
      emailAuthKey: string;
    }
  >(
    "user",
    (data) =>
      axios.post(`${baseUrl}/members`, data).then((response) => response.data),
    {
      onMutate() {
        setSignUpError("");
        setSignUpSuccess(false);
      },
      onSuccess() {
        setSignUpSuccess(true);
      },
      onError(error) {
        setSignUpError(error.response?.data);
        alert("양식을 알맞게 작성해주세요");
      },
    }
  );
  const birthYear = Number(birth.slice(0, 4));

  function formatBirthday(birthday: string): string {
    const year = birthday.slice(0, 4);
    const month = birthday.slice(4, 6);
    const day = birthday.slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  const formattedBirthday = formatBirthday(birth);

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
      if (
        name &&
        email &&
        gender &&
        password &&
        checkPassword &&
        emailAuthKey
      ) {
        mutation.mutate({
          name,
          age: today.getFullYear() - birthYear + 1,
          gender,
          email,
          password,
          checkPassword,
          birth: formattedBirthday,
          emailAuthKey,
        });
      }
    },
    [email, name, password, checkPassword, birth, emailAuthKey, mutation]
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

  const redirectToMain = () => {
    if (signUpSuccess) {
      return <Link to="/login"></Link>;
    }
  };

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
              Cocoa
            </Link>{" "}
            회원이신가요?
          </div>
          <div>
            <Link to="/login">로그인</Link>
          </div>
        </SubHeader>
        <Form onSubmit={onSubmit}>
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
          <Label>
            <Input
              type="text"
              id="birth"
              name="birth"
              value={birth}
              onChange={onchangeBirth}
              placeholder="생년월일 8자리"
            />
          </Label>
          <CheckLabel>
            <Label2>
              <InputGender
                type="radio"
                name="성별"
                value="MALE"
                onChange={onChangeGender}
              />
              <GenderSpan>남자</GenderSpan>
            </Label2>
            <Label2>
              <InputGender
                type="radio"
                name="성별"
                value="FEMALE"
                onChange={onChangeGender}
              />
              <GenderSpan>여자</GenderSpan>
            </Label2>
          </CheckLabel>
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
