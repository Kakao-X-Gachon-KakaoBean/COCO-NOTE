import { Modal } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteTaskValue, SelectedTaskId } from '@states/SprintState.ts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteTaskModal = () => {
  const [isDeleteTask, setIsDeleteTask] = useRecoilState(DeleteTaskValue);
  const id = useRecoilValue(SelectedTaskId);
  const navigate = useNavigate();

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`, {
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setIsDeleteTask(false);
      navigate(-1);
    } catch (error) {
      console.error('하위작업 삭제에 실패했습니다.', error);
    }
  };

  const handleCancel = () => {
    setIsDeleteTask(false);
  };

  return (
    <Modal
      title="정말로 하위작업을 삭제하시겠습니까?"
      open={isDeleteTask}
      onOk={handleDeleteTask}
      onCancel={handleCancel}
    ></Modal>
  );
};
export default DeleteTaskModal;
