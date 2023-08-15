import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Label, Wrapper } from '@/pages/Login/styles.tsx';
import {
  CheckBtn,
  Correct,
  EmailInput,
  EmailLabel,
  Error,
  Form,
  Header,
  Input,
  LoginBtn,
  SubHeader,
} from '@/pages/SignUp/styles';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { SignUpUser } from '@/states/userState.ts';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'antd';
import useInput from '../../hooks/useInput.ts';
import { postEmail, signUp } from '@/Api/User/SignUp.ts';

const SignUp = () => {
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, , setPassword] = useInput('');
  const [checkPassword, , setCheckPassword] = useInput('');
  const [emailAuthKey, onChangeEmailAuthKey] = useInput('');

  const [failUseEmail, setFailUseEmail] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [mismatchError, setMismatchError] = useState(false);

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value === checkPassword);
    },
    [checkPassword, setPassword]
  );

  const onChangeCheckPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCheckPassword(e.target.value);
      setMismatchError(e.target.value === password);
    },
    [password, setCheckPassword]
  );

  const signUpUser: SignUpUser = {
    name,
    email,
    password,
    checkPassword,
    emailAuthKey,
  };
  const signUpMutation = useMutation<'회원가입 성공' | '회원가입 실패', AxiosError, SignUpUser>('signup', signUp, {
    onSuccess: data => {
      if (data === '회원가입 성공') {
        setSignUpSuccess(true);
      } else {
        setSignUpSuccess(false);
        toast.error('양식을 알맞게 작성해주세요');
      }
    },
    onError: () => {
      alert('서버와 연결이 되어있지 않습니다.');
    },
  });

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signUpMutation.mutate(signUpUser);
    },
    [signUpMutation, signUpUser]
  );

  const postEmailMutation = useMutation<'이메일 발송 성공' | '이메일 발송 실패', AxiosError, string>(
    'post email',
    postEmail,
    {
      onSuccess: data => {
        if (data === '이메일 발송 성공') {
          setFailUseEmail(true);
          toast.success('메일로 인증 번호가 발송되었습니다.');
        } else {
          toast.error('인증 번호 발송에 실패하였습니다.');
          setFailUseEmail(false);
        }
      },
      onError: () => {
        alert('서버와 연결이 되어있지 않습니다.');
      },
    }
  );

  const onSubmitEmail = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e?.preventDefault();

      if (!email || !email.trim()) {
        return;
      }
      postEmailMutation.mutate(email);
    },
    [postEmailMutation, email]
  );

  return (
    <>
      <Wrapper>
        <Header>회원가입</Header>
        <SubHeader>
          <div>
            이미{' '}
            <Link to={'/main'} style={{ color: '#039ba1', fontWeight: 'bold' }}>
              COCO:NOTE
            </Link>{' '}
            회원이신가요?
          </div>
          <div>
            <Link to="/login">로그인</Link>
          </div>
        </SubHeader>
        <Form onSubmit={onSubmit}>
          <Label>
            <Input type="text" id="name" name="name" value={name} onChange={onChangeName} placeholder="이름" />
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
              onClick={e => {
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
            {!mismatchError && checkPassword.length >= 1 && <Error>비밀번호가 일치하지 않습니다!</Error>}
            {mismatchError && checkPassword.length >= 1 && <Correct>비밀번호가 일치합니다!</Correct>}
          </Label>
          <LoginBtn type="submit">가입하기</LoginBtn>
        </Form>
      </Wrapper>
      <Modal
        title="COCONOTE"
        closeIcon={' '}
        footer={[
          <Link key="submit" to="/login">
            <Button type="primary">로그인 하러 가기</Button>
          </Link>,
        ]}
        open={signUpSuccess}
        centered
      >
        <p>COCONOTE의 회원이 되신 것을 환영합니다.</p>
      </Modal>
    </>
  );
};

export default SignUp;
