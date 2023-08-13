import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilValue } from 'recoil';
import { SelectedSprintId, SelectedSprintState } from '@/states/SprintState.ts';
import { ComponentWrapper, TitleNEdit, Wrapper } from '@/pages/SprintDetailPage/styles.tsx';
import { Button, DatePicker, DatePickerProps, Input } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

const SprintEditPage = () => {
  const selectedSprint = useRecoilValue(SelectedSprintState);
  const sprintId = useRecoilValue(SelectedSprintId);
  const [title, setTitle] = useState(selectedSprint.sprintTitle);
  const [contents, setContents] = useState(selectedSprint.sprintDesc);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { TextArea } = Input;
  const navigate = useNavigate();

  const editSprintMutation = useMutation<
    string,
    AxiosError,
    { sprintTitle: string; sprintDesc: string; startDate: string; dueDate: string }
  >(
    'editsprint',
    data =>
      axios
        .patch(`http://localhost:8080/sprints/${sprintId}`, data, {
          withCredentials: true,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then(response => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        console.log(data);
        navigate(-1);
      },
      onError(error) {
        console.log(error);
        alert('스프린트 수정에 실패하였습니다.');
      },
    }
  );

  const onSubmit = useCallback(() => {
    if (title && contents && startDate && dueDate) {
      editSprintMutation.mutate({
        sprintTitle: title,
        sprintDesc: contents,
        startDate: startDate,
        dueDate: dueDate,
      });
    }
  }, [title, contents, startDate, dueDate, editSprintMutation]);

  const onChangeStartDate: DatePickerProps['onChange'] = dateString => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setStartDate(dateString);
  };

  const onChangeDueDate: DatePickerProps['onChange'] = dateString => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setDueDate(dateString);
  };

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ComponentWrapper>
          <TitleNEdit>
            <TextArea
              value={title}
              autoSize={{ minRows: 1, maxRows: 10 }}
              onChange={e => setTitle(e.target.value)}
              placeholder="스프린트 명"
              style={{ fontSize: 'xx-large', color: 'Black', marginTop: '5vh', marginBottom: '5vh', width: '50vw' }}
            />
            <Button onClick={onSubmit}>완료하기</Button>
          </TitleNEdit>
          <TextArea
            value={contents}
            autoSize={{ minRows: 3, maxRows: 10 }}
            onChange={e => setContents(e.target.value)}
            placeholder="스프린트 설명"
            style={{ fontSize: 'large', color: 'Black', marginBottom: '3vh', width: '50vw' }}
          />
          <div>
            시작일 <DatePicker onChange={onChangeStartDate} />
          </div>
          <div>
            종료일 <DatePicker onChange={onChangeDueDate} />
          </div>
        </ComponentWrapper>
      </Wrapper>
    </>
  );
};

export default SprintEditPage;
