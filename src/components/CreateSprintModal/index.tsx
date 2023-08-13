import { DatePicker, DatePickerProps, Input, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AddSprintValue, SprintValueState } from '@states/SprintState.ts';
import { TableData } from '@components/Sprint/type.ts';
//import moment from 'moment';

const CreateSprintModal = () => {
  const [sprintList, setSprintList] = useRecoilState(SprintValueState);
  const [isAddSprint, setIsAddSprint] = useRecoilState(AddSprintValue);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [dueMonth, setDueMonth] = useState('');
  //const [flagStartDate, setFlagStartDate] = useState('');
  const { TextArea } = Input;

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
  const handleOk = () => {
    if (title && contents && startDate && dueDate) {
      addSprint();
      setIsAddSprint(false);
      setTitle('');
      setContents('');
      setStartDate('');
      setDueDate('');
      toast.success('스프린트가 생성 되었습니다.'); // toast.success로 성공 메시지 표시
    } else {
      toast.error('각 란을 정확히 입력해주세요'); // toast.error로 실패 메시지 표시
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContents('');
    setStartDate('');
    setDueDate('');
    setIsAddSprint(false);
  };

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

  const addSprint = () => {
    if (sprintList[0].key === 'NoItem') {
      const newSprint: TableData[] = [
        {
          key: '1',
          sprintId: 1,
          sprintTitle: title,
          sprintDesc: contents,
          startDate: startDate,
          dueDate: dueDate,
          startMonth: startMonth,
          dueMonth: dueMonth,
        },
      ];

      newSprint.forEach(sprint => {
        const data = insertYInMonths(sprint.startMonth, sprint.dueMonth);
        Object.assign(sprint, data);
      });
      setSprintList(newSprint);
    } else {
      let newSprint: TableData = {
        key: String(sprintList.length + 1),
        sprintId: sprintList.length + 1,
        sprintTitle: title,
        sprintDesc: contents,
        startDate: startDate,
        dueDate: dueDate,
        startMonth: startMonth,
        dueMonth: dueMonth,
      };
      const data = insertYInMonths(startMonth, dueMonth);
      newSprint = { ...newSprint, ...data };
      setSprintList(prevSprintList => [...prevSprintList, newSprint]);
    }
  };
  return (
    <Modal title="새 스프린트 생성" open={isAddSprint} onOk={handleOk} onCancel={handleCancel}>
      <TextArea
        value={title}
        autoSize={{ minRows: 1, maxRows: 10 }}
        onChange={e => setTitle(e.target.value)}
        placeholder="스프린트 명"
        style={{ marginBottom: '2rem', marginTop: '3rem' }}
      />
      <TextArea
        value={contents}
        autoSize={{ minRows: 3, maxRows: 10 }}
        onChange={e => setContents(e.target.value)}
        placeholder="스프린트 설명"
        style={{ marginBottom: '2rem' }}
      />
      <div>
        시작일 <DatePicker onChange={onChangeStartDate} />
      </div>
      <div>
        종료일 <DatePicker onChange={onChangeDueDate} />
      </div>
    </Modal>
  );
};
export default CreateSprintModal;
