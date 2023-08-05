import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AddSprintValue, SelectedSprintState, SprintValueState } from '@/states/SprintState.ts';
import { ComponentWrapper, TitleNEdit, Wrapper } from '@/pages/SprintDetailPage/styles.tsx';
import { Button, DatePicker, DatePickerProps, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SprintEditPage = () => {
  const selectedSprint = useRecoilValue(SelectedSprintState);
  const [sprintList, setSprintList] = useRecoilState(SprintValueState);
  const [isAddSprint, setIsAddSprint] = useRecoilState(AddSprintValue);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [dueMonth, setDueMonth] = useState('');
  const { TextArea } = Input;
  const navigate = useNavigate();

  const getBack = () => {
    navigate(-1);
  };

  const onChangeStartDate: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      const text = date.year() + ' ' + Number(date.month() + 1) + '월';
      setStartDate(dateString);
      setStartMonth(text);
    }
  };

  const onChangeDueDate: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      const text = date.year() + ' ' + Number(date.month() + 1) + '월';
      setDueDate(dateString);
      setDueMonth(text);
    }
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
              value={selectedSprint.sprintTitle}
              autoSize={{ minRows: 1, maxRows: 10 }}
              onChange={e => setTitle(e.target.value)}
              placeholder="스프린트 명"
              style={{ fontSize: 'xx-large', color: 'Black', marginTop: '5vh', marginBottom: '5vh', width: '50vw' }}
            />
            <Button onClick={getBack}>완료하기</Button>
          </TitleNEdit>
          <TextArea
            value={selectedSprint.sprintDesc}
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
