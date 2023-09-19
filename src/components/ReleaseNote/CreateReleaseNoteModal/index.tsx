import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { CreateManuscript, ModalProps } from '@/types/CreateReleaseNoteModalType.ts';
import { GuideText, ModalDiv } from '@/components/ReleaseNote/CreateReleaseNoteModal/styles.tsx';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { createManuscript } from '@/api/ReleaseNote/ManuScript.ts';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

const CreateReleaseNoteModal: React.FC<ModalProps> = ({ visible, handleOk }) => {
  const queryClient = useQueryClient();
  const headerParam = useParams();
  const projectId = headerParam.projectId;
  const [title, setTitle] = useState('');
  const [version, setVersion] = useState('');

  const postCreateManuscriptMutation = useMutation<'원고 생성 성공' | '원고 생성 실패', AxiosError, CreateManuscript>(
    'manuscripts',
    createManuscript,
    {
      onSuccess: data => {
        if (data === '원고 생성 성공') {
          queryClient.invalidateQueries('manuscriptAll');
          toast.success('릴리즈 노트 생성에 성공했습니다.');
          handleOk({ title: title, version: version, status: 'success' });
        } else {
          toast.error('정보를 다시 확인해주시기 바랍니다.');
        }
      },
      onError: () => {
        toast.error('서버와 연결이 되어있지 않습니다.');
      },
    }
  );
  const createReleaseNote = () => {
    postCreateManuscriptMutation.mutate({
      title: title,
      version: version,
      content: ' ',
      projectId: projectId ?? ' ',
    });
  };
  return (
    <>
      <Modal
        centered
        open={visible}
        onCancel={() => handleOk({ title: '', version: '', status: 'fail' })}
        title={'새 릴리즈 노트 생성하기'}
        footer={[
          <Button key={'footer'} onClick={() => createReleaseNote()}>
            생성
          </Button>,
        ]}
      >
        <ModalDiv>
          <div>
            <GuideText>제목</GuideText>
            <Input value={title} onChange={event => setTitle(event.target.value)} placeholder={'제목을 입력해주세요'} />
          </div>
          <div>
            <GuideText>버전</GuideText>
            <Input
              value={version}
              onChange={event => setVersion(event.target.value)}
              placeholder={'버전을 입력해주세요'}
            />
          </div>
        </ModalDiv>
      </Modal>
    </>
  );
};

export default CreateReleaseNoteModal;
