import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { useRecoilState } from 'recoil';
import { SelectedSprintState, SprintValueState } from '@/states/SprintState.ts';
import { ComponentWrapper, TitleNEdit, Wrapper } from '@/pages/SprintDetailPage/styles.tsx';
import { Button, DatePicker, DatePickerProps, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableData } from '@components/Sprint/type.ts';

const SprintEditPage = () => {
  const [selectedSprint, setSelectedSprint] = useRecoilState(SelectedSprintState);
  const [sprintList, setSprintList] = useRecoilState(SprintValueState);
  const [title, setTitle] = useState(selectedSprint.sprintTitle);
  const [contents, setContents] = useState(selectedSprint.sprintDesc);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [dueMonth, setDueMonth] = useState('');
  const { TextArea } = Input;
  const navigate = useNavigate();

  function insertYInMonths(startDate: string, dueDate: string): { [key: string]: string } {
    const startYear = Number(startDate.split(' ')[0]);
    const startMonth = Number(startDate.split(' ')[1].replace('월', ''));
    const dueYear = Number(dueDate.split(' ')[0]);
    const dueMonth = Number(dueDate.split(' ')[1].replace('월', ''));

    const data: { [key: string]: string } = {};

    for (let year = startYear; year <= dueYear; year++) {
      const start = year === startYear ? startMonth : 1;
      const end = year === dueYear ? dueMonth : 12;

      for (let month = start; month <= end; month++) {
        data[`${year} ${month}월`] = 'Y';
      }
    }

    return data;
  }

  const getBack = () => {
    let newSprint: TableData = {
      key: selectedSprint.key,
      sprintId: selectedSprint.sprintId,
      sprintTitle: title,
      sprintDesc: contents,
      startDate: startDate,
      dueDate: dueDate,
      startMonth: startMonth,
      dueMonth: dueMonth,
    };
    const data = insertYInMonths(startMonth, dueMonth);
    newSprint = { ...newSprint, ...data };

    const updatedSprintList = sprintList.map(sprint => (sprint.key === selectedSprint.key ? newSprint : sprint));

    setSelectedSprint(newSprint);
    setSprintList(updatedSprintList);
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
              value={title}
              autoSize={{ minRows: 1, maxRows: 10 }}
              onChange={e => setTitle(e.target.value)}
              placeholder="스프린트 명"
              style={{ fontSize: 'xx-large', color: 'Black', marginTop: '5vh', marginBottom: '5vh', width: '50vw' }}
            />
            <Button onClick={getBack}>완료하기</Button>
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
