import { ChangeEvent, useCallback, useEffect, useState } from 'react';
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
import { memberIdState } from '@states/UserState.ts';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import SearchPassword from '@components/SearchPassword';
import { setCookie } from '@utils/cookie.ts';
import { logIn } from '@api/User/Login.ts';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectInfoMenuOpenState, SelectedProjectState } from '@states/ProjectState.ts';
import { GOOGLE_URL, KAKAO_URL } from '@api';
import { LoginResponse, LoginUser } from '@type/UserType.ts';
import { toast } from 'react-toastify';

const LogIn = () => {
  const initialSelectedProject = useResetRecoilState(SelectedProjectState);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [, setMemberId] = useRecoilState(memberIdState);
  const [checkPasswordModal, setCheckPasswordModal] = useState(false);
  const [isLogin] = useState(localStorage.getItem('accessToken') !== null);
  const navigate = useNavigate();
  const onClosePasswordModal = useCallback(() => {
    setCheckPasswordModal(prev => !prev);
  }, []);
  const [isLoginBtnActivate, setIsLoginBtnActivate] = useState(false);
  useEffect(() => {
    if (email.length > 0 || password.length > 0) {
      setIsLoginBtnActivate(true);
    } else {
      setIsLoginBtnActivate(false);
    }
  }, [email, password]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logInData: LoginUser = {
    email,
    password,
  };

  const logInMutation = useMutation<LoginResponse, AxiosError, LoginUser>('logIn', logIn, {
    onSuccess: data => {
      localStorage.setItem('accessToken', data?.accessToken);
      initialSelectedProject();
      setProjectInfoMenuOpen(false);
      setMemberId(data?.memberId.toString());
      setCookie('refreshToken', data?.refreshToken, { path: '/' });

      navigate('/main');
    },
    onError: error => {
      if (error.response && error.response.status === 401) {
        toast.error('이메일과 비밀번호가 일치하지 않습니다.');
      } else if (error.response && error.response.status === 500) {
        toast.error('서버 오류입니다. 잠시 후에 다시 시도해주세요');
      }
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
      <Wrapper>
        <Header>
          <Link to="/initial">COCONOTE</Link>
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
          <LoginBtn type="submit" isLoginBtnActivate={isLoginBtnActivate}>
            로그인
          </LoginBtn>
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
          <GoogleBtn href={`${GOOGLE_URL}`}>
            <Img src={'googleLogo.svg'} alt={'googleLogo'} />
            <div>Google로 계속</div>
          </GoogleBtn>
          <KakaoBtn href={`${KAKAO_URL}`}>
            <Img src={'kakaoLogo.svg'} alt={'kakaoLogo'} />
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
