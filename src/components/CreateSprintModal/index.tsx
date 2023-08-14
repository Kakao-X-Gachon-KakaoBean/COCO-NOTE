import { DatePicker, DatePickerProps, Input, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { AddSprintValue, CreateSprintDataType } from '@states/SprintState.ts';
import { TableData } from '@components/Sprint/type.ts';
import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router'; //import moment from 'moment';

const CreateSprintModal = () => {
  const [isAddSprint, setIsAddSprint] = useRecoilState(AddSprintValue);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { TextArea } = Input;
  const id = useParams().projectId;
  const queryClient = useQueryClient();

  const CreateSprintMutation = useMutation<TableData, AxiosError, CreateSprintDataType>(
    'createSprint',
    data =>
      axios
        .post('http://localhost:8080/sprints', data, {
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
        setIsAddSprint(false);
        queryClient.invalidateQueries(`projectList`);
        setTitle('');
        setContents('');
        setStartDate('');
        setDueDate('');
        toast.success('스프린트가 생성 되었습니다.');
      },
      onError(error) {
        console.log(error);
        toast.error('스프린트 생성에 실패하였습니다.');
      },
    }
  );

  const onSubmitSprint = useCallback(
    (e: any) => {
      e.preventDefault();

      if (title && contents && startDate && dueDate && id) {
        CreateSprintMutation.mutate({
          sprintTitle: title,
          sprintDesc: contents,
          projectId: Number(id),
          startDate: startDate,
          dueDate: dueDate,
        });
      }
    },
    [title, contents, id, startDate, dueDate, CreateSprintMutation]
  );

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

  const handleCancel = () => {
    setTitle('');
    setContents('');
    setStartDate('');
    setDueDate('');
    setIsAddSprint(false);
  };

  return (
    <Modal title="새 스프린트 생성" open={isAddSprint} onOk={onSubmitSprint} onCancel={handleCancel}>
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
