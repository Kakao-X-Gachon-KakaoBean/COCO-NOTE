import { DatePicker, DatePickerProps, Input, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { AddSprintValue } from '@states/SprintState.ts';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { createSprint } from '@api/Sprint/Sprint.ts';
import { CreateSprintDataType } from '@type/SprintType.ts';
import dayjs from 'dayjs';

const CreateSprintModal = () => {
  const [isAddSprint, setIsAddSprint] = useRecoilState(AddSprintValue);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { TextArea } = Input;
  const id = useParams().projectId;
  const queryClient = useQueryClient();
  const [startDateValue, setStartDateValue] = useState<string | null>(null);
  const [dueDateValue, setDueDateValue] = useState<string | null>(null);

  const CreateSprintMutation = useMutation<string, string, CreateSprintDataType>('createSprint', createSprint, {
    onMutate() {},
    onSuccess(data) {
      if (data === '스프린트 생성 완료') {
        setIsAddSprint(false);
        queryClient.invalidateQueries('sprintList');
        setTitle('');
        setContents('');
        setStartDate('');
        setDueDate('');
        setStartDateValue('');
        setDueDateValue('');
        toast.success('스프린트가 생성 되었습니다.');
      } else if (data === '스프린트 생성 실패: 잘못된 요청') {
        toast.warning('모든칸을 정확하게 입력해주세요.');
      } else if (data === '스프린트 생성 실패: 비인증 상태') {
        toast.warning('로그아웃되었습니다. 재로그인 해주십시오.');
      } else if (data === '스프린트 생성 실패: 권한 거부') {
        toast.warning('권한이 거부되어 스프린트 생성에 실패했습니다.');
      } else if (data === '스프린트 생성 실패: 존재하지 않는 요청') {
        toast.warning('존재하지 않는 요청이므로 스프린트 생성에 실패했습니다.');
      } else if (data === '스프린트 생성 실패: 서버 오류') {
        toast.warning('서버 오류로 인해 스프린트 생성에 실패했습니다.');
      } else if (data === '스프린트 생성 실패: 알 수 없는 오류') {
        toast.warning('서버와 연결이 되어있지 않습니다.');
      } else {
        toast.warning('알수없는 오류입니다. 고객센터로 문의바랍니다.');
      }
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onSubmitSprint = useCallback(
    (e: any) => {
      e.preventDefault();

      CreateSprintMutation.mutate({
        sprintTitle: title,
        sprintDesc: contents,
        projectId: Number(id),
        startDate: startDate,
        dueDate: dueDate,
      });
    },
    [title, contents, id, startDate, dueDate, CreateSprintMutation]
  );

  const onChangeStartDate: DatePickerProps['onChange'] = dateString => {
    if (dateString) {
      const parsedDate = dayjs(dateString);
      const formattedDate = parsedDate.format('YYYY-MM-DD');
      setStartDate(formattedDate);
      setStartDateValue(formattedDate);
    } else {
      setStartDate('');
      setStartDateValue('');
    }
  };

  const onChangeDueDate: DatePickerProps['onChange'] = dateString => {
    if (dateString) {
      const parsedDate = dayjs(dateString);
      const formattedDate = parsedDate.format('YYYY-MM-DD');
      setDueDate(formattedDate);
      setDueDateValue(formattedDate);
    } else {
      setDueDate('');
      setDueDateValue('');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContents('');
    setStartDate('');
    setDueDate('');
    setStartDateValue(null);
    setDueDateValue(null);
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
        시작일
        <DatePicker value={startDateValue ? dayjs(startDateValue) : null} onChange={onChangeStartDate} />
      </div>
      <div>
        종료일
        <DatePicker value={dueDateValue ? dayjs(dueDateValue) : null} onChange={onChangeDueDate} />
      </div>
    </Modal>
  );
};
export default CreateSprintModal;
