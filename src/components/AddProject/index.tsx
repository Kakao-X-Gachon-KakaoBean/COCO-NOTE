import { Button, Input, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { AddProjectClickState } from '@/states/ProjectState.ts';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { ProjectInfo } from '@/types/ProjectType.ts';
import { addProject } from '@/api/Project/ProjectList.ts';

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

  const addProjectMutation = useMutation<'프로젝트 생성 성공' | '프로젝트 생성 실패', AxiosError, ProjectInfo>(
    'addProject',
    addProject,
    {
      onSuccess: data => {
        if (data === '프로젝트 생성 성공') {
          toast.success('프로젝트가 생성되었습니다.');
          queryClient.invalidateQueries('projectList');
          setTitle('');
          setContent('');
          setIsAddProject(false);
        } else {
          toast.error('프로젝트 명과 프로젝트 설명을 정확히 입력해주세요');
        }
      },
      onError: () => {
        alert('서버와 연결이 되어있지 않습니다.');
      },
    }
  );

  const onSubmitProject = useCallback(
    (e: any) => {
      e.preventDefault();
      addProjectMutation.mutate({ title, content });
    },
    [title, content, addProjectMutation]
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
