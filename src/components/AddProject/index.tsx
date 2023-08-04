import { Button, Input, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { AddProjectClickState } from '@/states/ProjectState.ts';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { MemberState } from '@states/MemberState.ts';
import axios, { AxiosError } from 'axios';

const AddProject = () => {
  const [isAddProject, setIsAddProject] = useRecoilState(AddProjectClickState);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { TextArea } = Input;

  const queryClient = useQueryClient();

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setIsAddProject(false);
  };

  const mutation = useMutation<MemberState, AxiosError, { title: string; content: string }>(
    'SubmitProject',
    data =>
      axios
        .post(`http://localhost:8080/projects`, data, {
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
        toast.success('프로젝트가 생성 되었습니다.');
        queryClient.invalidateQueries('projectList');
        setTitle('');
        setContent('');
        setIsAddProject(false);
      },
      onError(error) {
        console.log(error);
        toast.error('프로젝트 명과 프로젝트 설명을 정확히 입력해주세요');
      },
    }
  );

  const onSubmitProject = useCallback(
    (e: any) => {
      e.preventDefault();
      mutation.mutate({ title, content });
    },
    [title, content, mutation]
  );

  return (
    <Modal
      title="새 프로젝트 생성"
      open={isAddProject}
      onCancel={handleCancel}
      footer={
        <Button type="primary" style={{ width: '5rem' }} onClick={onSubmitProject}>
          전송
        </Button>
      }
      centered
    >
      <TextArea
        value={title}
        autoSize={{ minRows: 1, maxRows: 10 }}
        onChange={e => setTitle(e.target.value)}
        placeholder="프로젝트 명"
        style={{ marginBottom: '2rem', marginTop: '3rem' }}
      />
      <TextArea
        value={content}
        autoSize={{ minRows: 3, maxRows: 10 }}
        onChange={e => setContent(e.target.value)}
        placeholder="프로젝트 설명"
        style={{ marginBottom: '2rem' }}
      />
    </Modal>
  );
};
export default AddProject;
