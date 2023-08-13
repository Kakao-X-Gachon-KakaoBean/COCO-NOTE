import { Modal } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteSprintValue, SelectedSprintId } from '@states/SprintState.ts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteSprintModal = () => {
  const [isDeleteSprint, setIsDeleteSprint] = useRecoilState(DeleteSprintValue);
  const id = useRecoilValue(SelectedSprintId);
  const navigate = useNavigate();

  const handleDeleteSprint = async () => {
    try {
      await axios.delete(`http://localhost:8080/sprints/${id}`, {
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setIsDeleteSprint(false);
      navigate(-1);
    } catch (error) {
      console.error('스프린트 삭제에 실패했습니다.', error);
    }
  };

  const handleCancel = () => {
    setIsDeleteSprint(false);
  };

  return (
    <Modal
      title="정말로 스프린트를 삭제하시겠습니까?"
      open={isDeleteSprint}
      onOk={handleDeleteSprint}
      onCancel={handleCancel}
    ></Modal>
  );
};
export default DeleteSprintModal;
