import React, { FC, useCallback, useEffect, useState } from 'react';

import {
  Button,
  Div,
  EmailBody,
  EmailHeader,
  Form,
  Header,
  InputInfo,
  InputKey,
  Wrapper,
} from '@components/SearchEmail/styles';

import axios, { AxiosError } from 'axios';

import { EmailModal, Search } from '@components/SearchEmail/type';
import { useMutation } from 'react-query';

const SearchEmail: FC<EmailModal> = ({ name, onChangeName, onCloseEmailModal, birth, onChangeBirth }) => {
  const baseUrl = 1234;

  const [email, setEmail] = useState('');
  const [submitOrClose, setSubmitOrClose] = useState('인증 하기');
  const stopPropagation = useCallback((e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
  }, []);
  useEffect(() => {
    if (email) {
      setSubmitOrClose('닫기');
    }
  }, [email]);
  // const queryClient = useQueryClient();

  function formatBirthday(birthday: string): string {
    const year = birthday.slice(0, 4);
    const month = birthday.slice(4, 6);
    const day = birthday.slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  const formattedBirthday = formatBirthday(birth);

  const mutation = useMutation<Search, AxiosError, { name: string; birth: string }>(
    'searchEmail',
    data =>
      axios
        .post(`${baseUrl}/members/find-email`, data, {
          withCredentials: true,
        })
        .then(response => response.data),
    {
      onMutate() {
        // setLogInError(false);
      },
      onSuccess(data) {
        setEmail(data?.email);
      },
      onError() {
        alert('정보를 잘못 입력하셨습니다.');
      },
    }
  );
  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      mutation.mutate({ name, birth: formattedBirthday });
    },
    [mutation, name, formattedBirthday]
  );

  return (
    <Wrapper onClick={stopPropagation}>
      <Form>
        <Div>
          <Header>이메일 찾기</Header>
        </Div>
        <button onClick={onCloseEmailModal}>X</button>
      </Form>

      <InputKey>
        <Form onSubmit={onSubmit}>
          <InputInfo
            type="text"
            id="name"
            onChange={onChangeName}
            name="name"
            value={name}
            placeholder="이름"
          ></InputInfo>
          <InputInfo
            type="text"
            id="birth"
            onChange={onChangeBirth}
            name="birth"
            value={birth}
            placeholder="생년월일 8자리"
          ></InputInfo>
          {email ? (
            <EmailBody>
              <EmailHeader>이메일</EmailHeader>
              {email}
            </EmailBody>
          ) : (
            <></>
          )}
          {email ? (
            <Button onClick={onCloseEmailModal}>{submitOrClose}</Button>
          ) : (
            <Button type="submit">{submitOrClose}</Button>
          )}
        </Form>
      </InputKey>
    </Wrapper>
  );
};

export default SearchEmail;
