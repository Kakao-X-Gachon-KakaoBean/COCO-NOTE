import { Modal } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteSprintValue, SelectedSprintId } from '@states/SprintState.ts';
import { useNavigate } from 'react-router-dom';
import { deleteSprint } from '@api/Sprint/Sprint.ts';
import { toast } from 'react-toastify';

const DeleteSprintModal = () => {
  const [isDeleteSprint, setIsDeleteSprint] = useRecoilState(DeleteSprintValue);
  const sprintId = useRecoilValue(SelectedSprintId);
  const navigate = useNavigate();

  const handleDeleteSprint = async (id: number) => {
    const result = await deleteSprint(id);
    if (result === '스프린트 삭제 완료') {
      setIsDeleteSprint(false);
      toast.success('스프린트가 삭제 되었습니다.');
      navigate(-1);
    } else {
      toast.error('서버와 연결 되어있지 않습니다.');
    }
  };

  const handleCancel = () => {
    setIsDeleteSprint(false);
  };

  return (
    <Modal
      title="정말로 스프린트를 삭제하시겠습니까?"
      open={isDeleteSprint}
      onOk={() => handleDeleteSprint(sprintId)}
      onCancel={handleCancel}
    ></Modal>
  );
};
export default DeleteSprintModal;
