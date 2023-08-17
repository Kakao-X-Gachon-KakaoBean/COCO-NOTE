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
import { AxiosError } from 'axios';
import { editSprint } from '@/Api/Sprint/Sprint.ts';
import { toast } from 'react-toastify';
import { EditSprintDataType } from '@/types/SprintType.ts';

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
    '스프린트 수정 완료' | '스프린트 수정 실패',
    AxiosError,
    {
      data: EditSprintDataType;
      selectedSprintId: number;
    }
  >('editsprint', data => editSprint(data.data, data.selectedSprintId), {
    onMutate() {},
    onSuccess(data) {
      if (data === '스프린트 수정 완료') {
        toast.success('스프린트 수정이 완료되었습니다.');
        navigate(-1);
      } else {
        toast.warning('스프린트 수정에 실패하였습니다.');
      }
    },
    onError(error) {
      console.log(error);
      toast.error('서버와 연결 되어있지 않습니다.');
    },
  });

  const onSubmit = useCallback(() => {
    if (title && contents && startDate && dueDate) {
      editSprintMutation.mutate({
        data: {
          sprintTitle: title,
          sprintDesc: contents,
          startDate: startDate,
          dueDate: dueDate,
        },
        selectedSprintId: sprintId,
      });
    }
  }, [title, contents, startDate, dueDate, editSprintMutation, sprintId]);

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
