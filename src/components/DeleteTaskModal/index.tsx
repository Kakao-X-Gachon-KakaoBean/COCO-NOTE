import { Modal } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteTaskValue, SelectedTaskId } from '@/states/SprintState.ts';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '@/Api/Sprint/Sprint.ts';
import { toast } from 'react-toastify';

const DeleteTaskModal = () => {
  const [isDeleteTask, setIsDeleteTask] = useRecoilState(DeleteTaskValue);
  const taskId = useRecoilValue(SelectedTaskId);
  const navigate = useNavigate();

  const handleDeleteTask = async (id: number) => {
    const result = await deleteTask(id);
    if (result === '하위작업 삭제 완료') {
      setIsDeleteTask(false);
      toast.success('하위작업이 삭제 되었습니다.');
      navigate(-1);
    } else {
      toast.warning('하위작업 삭제에 실패하였습니다.');
    }
  };

  const handleCancel = () => {
    setIsDeleteTask(false);
  };

  return (
    <Modal
      title="정말로 하위작업을 삭제하시겠습니까?"
      open={isDeleteTask}
      onOk={() => handleDeleteTask(taskId)}
      onCancel={handleCancel}
    ></Modal>
  );
};
export default DeleteTaskModal;
