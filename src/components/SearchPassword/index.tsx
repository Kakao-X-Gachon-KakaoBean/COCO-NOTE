import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';

import {
  Button,
  CheckBtn,
  Correct,
  Div,
  EmailLabel,
  Error,
  Form,
  Header,
  Input,
  InputKey,
  InputKeyWithText,
  Label,
  Wrapper,
} from '@components/SearchPassword/styles';
import { PasswordModal } from '@type/SearchPasswordType.ts';
import { useMutation, useQueryClient } from 'react-query';
import useInput from '../../hooks/useInput';
import { postEmail } from '@api/User/SignUp.ts';
import { modifyPassword } from '@api/User/Login.ts';
import { EditPassword } from '@type/UserType.ts';

const SearchPassword: FC<PasswordModal> = ({ onClosePasswordModal }) => {
  const [email, onChangeEmail] = useInput('');
  const [passwordToChange, , setPasswordToChange] = useInput('');
  const [checkPasswordToChange, , setCheckPasswordToChange] = useInput('');
  const [emailAuthKey, onChangeEmailAuthKey] = useInput('');
  const [, setFailUseEmail] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);
  const [isChangePasswordBtnActivate, setIsChangePasswordBtnActivate] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (
      email.length > 0 ||
      passwordToChange.length > 0 ||
      checkPasswordToChange.length > 0 ||
      emailAuthKey.length > 0
    ) {
      setIsChangePasswordBtnActivate(true);
    } else {
      setIsChangePasswordBtnActivate(false);
    }
  }, [email, passwordToChange, checkPasswordToChange, emailAuthKey]);

  const postEmailMutation = useMutation<any, AxiosError, string>('post email', postEmail, {
    onSuccess: data => {
      if (data === '이메일 발송 성공') {
        setFailUseEmail(true);
        toast.success('메일로 인증 번호가 발송되었습니다.');
      }
    },
    onError: error => {
      if (error.response && error.response.status === 400) {
        toast.error('이메일을 정확히 입력해주세요');
        setFailUseEmail(false);
      } else if (error.response && error.response.status === 500) {
        toast.error('서버 오류입니다. 잠시 후에 다시 시도해주세요');
      }
    },
  });

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
  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordToChange(e.target.value);
      setMismatchError(e.target.value === checkPasswordToChange);
    },
    [checkPasswordToChange, setPasswordToChange]
  );

  const onChangeCheckPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCheckPasswordToChange(e.target.value);
      setMismatchError(e.target.value === passwordToChange);
    },
    [passwordToChange, setCheckPasswordToChange]
  );

  const stopPropagation = useCallback((e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
  }, []);

  const modifyPasswordMutation = useMutation<any, AxiosError, EditPassword>(
    'modifyPassword',
    (data: EditPassword) => modifyPassword(data),
    {
      onSuccess: data => {
        if (data === '비밀번호 변경 성공') {
          queryClient.invalidateQueries('memberInfo');
          toast.success('비밀번호를 변경했습니다.');
        }
      },
      onError: error => {
        if (error.response && error.response.status === 400) {
          toast.error('정보를 잘못 입력하셨습니다.');
        } else if (error.response && error.response.status === 500) {
          toast.error('서버와 연결이 되어있지 않습니다.');
        }
      },
    }
  );

  const onSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (email && emailAuthKey && passwordToChange && checkPasswordToChange) {
        modifyPasswordMutation.mutate({
          email,
          emailAuthKey,
          passwordToChange,
          checkPasswordToChange,
        });
      }
    },
    [email, emailAuthKey, passwordToChange, checkPasswordToChange, modifyPasswordMutation]
  );

  return (
    <Wrapper onClick={stopPropagation}>
      <Form>
        <Div>
          <Header>비밀번호 변경</Header>
        </Div>
        <button onClick={onClosePasswordModal}>X</button>
      </Form>

      <EmailLabel>
        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} placeholder="이메일" />
        <CheckBtn
          type="button"
          onClick={e => {
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
        {!mismatchError && checkPasswordToChange.length >= 1 && <Error>비밀번호가 일치하지 않습니다!</Error>}
        {mismatchError && checkPasswordToChange.length >= 1 && <Correct>비밀번호가 일치합니다!</Correct>}
      </Label>

      {/*{failUseEmail && !proveEmail && (*/}
      {(!mismatchError && checkPasswordToChange.length >= 1) || (mismatchError && checkPasswordToChange.length >= 1) ? (
        <InputKeyWithText>
          <Form
            onSubmit={e => {
              onSubmit(e);
            }}
          >
            <Button type="submit" isChangePasswordBtnActivate={isChangePasswordBtnActivate}>
              비밀번호 변경
            </Button>
          </Form>
        </InputKeyWithText>
      ) : (
        <InputKey>
          <Form
            onSubmit={e => {
              onSubmit(e);
            }}
          >
            <Button type="submit" isChangePasswordBtnActivate={isChangePasswordBtnActivate}>
              비밀번호 변경
            </Button>
          </Form>
        </InputKey>
      )}
    </Wrapper>
  );
};

export default SearchPassword;
