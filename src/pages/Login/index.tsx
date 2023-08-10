import { ChangeEvent, useCallback, useState } from 'react';
import GoogleImg from '../../images/google-logo.png';
import KakaoImg from '../../images/kakao-logo.png';

import {
  Form,
  GoogleBtn,
  Header,
  Img,
  Input,
  KakaoBtn,
  Label,
  Line,
  LoginBtn,
  SearchBox,
  SearchBtn,
  SocialLogin,
  Vertical,
  Wrapper,
} from '@pages/Login/styles.tsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import Menu from '@components/Menu';
import useInput from '../../hooks/useInput.ts';
import { LoginResponse, LoginUser } from '@states/userState.ts';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import SearchPassword from '@components/SearchPassword';
import { ToastContainer } from 'react-toastify';
import { setCookie } from '@utils/cookie.ts';
import { logIn } from '@/Api/User/Login.ts';

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [checkPasswordModal, setCheckPasswordModal] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('accessToken') !== null);
  const navigate = useNavigate();
  const onClosePasswordModal = useCallback(() => {
    setCheckPasswordModal(prev => !prev);
  }, []);

  const logInData: LoginUser = {
    email,
    password,
  };

  const logInMutation = useMutation<LoginResponse, AxiosError, LoginUser>('logIn', logIn, {
    onSuccess: data => {
      localStorage.setItem('accessToken', data?.accessToken);
      setCookie('refreshToken', data?.refreshToken, { path: '/', secure: true });
      navigate('/main');
    },
    onError: () => {
      alert('이메일과 비밀번호가 일치하지 않습니다.');
    },
  });

  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      logInMutation.mutate(logInData);
    },
    [logInData, logInMutation]
  );

  if (isLogin) {
    return <Navigate replace to={'/main'} />;
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Wrapper>
        <Header>
          <Link to="/main">COCO:NOTE</Link>
        </Header>
        <Form onSubmit={onSubmit}>
          <Label>
            <Input type="text" id="id" name="id" value={email} onChange={onChangeEmail} placeholder="이메일" />
          </Label>
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
          <LoginBtn type="submit">로그인</LoginBtn>
          <SearchBox>
            <span
              style={{
                display: 'flex',
              }}
            >
              <SearchBtn type="button" onClick={onClosePasswordModal}>
                비밀번호 변경
              </SearchBtn>
            </span>
            <Vertical></Vertical>
            <span>
              <Link style={{ fontWeight: 'bold' }} to="/signup">
                회원 가입
              </Link>
            </span>
          </SearchBox>
        </Form>
        <Line>또는</Line>
        <SocialLogin>
          <GoogleBtn href={`http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/main`}>
            <Img src={GoogleImg} alt="Google" />
            <div>Google로 계속</div>
          </GoogleBtn>
          <KakaoBtn href={`http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/main`}>
            <Img src={KakaoImg} alt="Google" />
            <div>KaKao로 계속</div>
          </KakaoBtn>
        </SocialLogin>
        {checkPasswordModal && (
          <Menu show={checkPasswordModal} onCloseModal={onClosePasswordModal}>
            <SearchPassword onClosePasswordModal={onClosePasswordModal} />
          </Menu>
        )}
      </Wrapper>
    </>
  );
};

export default LogIn;
