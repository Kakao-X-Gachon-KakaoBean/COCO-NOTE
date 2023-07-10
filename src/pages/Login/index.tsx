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
import { Link } from 'react-router-dom';

import Menu from '@components/Menu';
import SearchEmail from '@components/SearchEmail';
import SearchPassword from '@components/PasswordModal';
import useInput from '../../hooks/useInput.ts';
import { IUser } from '@states/UserState.ts';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

const LogIn = () => {
  const baseUrl = '123';

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [name, onChangeName] = useInput('');
  const [birth, onChangeBirth] = useInput('');
  const [checkEmailModal, setCheckEmailModal] = useState(false);
  const [checkPasswordModal, setCheckPasswordModal] = useState(false);

  const onCloseEmailModal = useCallback(() => {
    setCheckEmailModal(prev => !prev);
  }, []);

  const onClosePasswordModal = useCallback(() => {
    setCheckPasswordModal(prev => !prev);
  }, []);

  const LoginMutation = useMutation<IUser, AxiosError, { email: string; password: string }>(
    'user',
    data =>
      axios
        .post('123', data, {
          withCredentials: true,
        })
        .then(response => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        localStorage.setItem('accessToken', data?.accessToken);
      },
      onError(error) {
        // setLogInError(error.response?.data?.code === 401);
        alert('로그인에 실패하였습니다.');
      },
    }
  );

  //로컬 로그인
  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      LoginMutation.mutate({ email, password });
    },
    [email, password, LoginMutation]
  );

  //로그인 정보 있을 시 메인으로 리다이렉트
  // if (isLogin) {
  //   return <Redirect to={"/main"} />;
  // }

  return (
    <>
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
              <SearchBtn type="button" onClick={onCloseEmailModal}>
                이메일 찾기
              </SearchBtn>
              <div>/</div>
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
          <GoogleBtn href={`${baseUrl}/oauth2/authorization/google?redirect_uri=http://localhost:3000/main`}>
            <Img src={GoogleImg} alt="Google" />
            <div>Google로 계속</div>
          </GoogleBtn>
          <KakaoBtn href={`${baseUrl}/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/main`}>
            <Img src={KakaoImg} alt="Google" />
            <div>KaKao로 계속</div>
          </KakaoBtn>
        </SocialLogin>
        {checkEmailModal && (
          <Menu show={checkEmailModal} onCloseModal={onCloseEmailModal}>
            {
              <SearchEmail
                name={name}
                onChangeName={onChangeName}
                onCloseEmailModal={onCloseEmailModal}
                birth={birth}
                onChangeBirth={onChangeBirth}
              />
            }
          </Menu>
        )}
        {checkPasswordModal && (
          <Menu show={checkPasswordModal} onCloseModal={onClosePasswordModal}>
            {
              <SearchPassword
                name={email}
                onChangeName={onChangeName}
                onClosePasswordModal={onClosePasswordModal}
                birth={birth}
                onChangeBirth={onChangeBirth}
              />
            }
          </Menu>
        )}
      </Wrapper>
    </>
  );
};

export default LogIn;
