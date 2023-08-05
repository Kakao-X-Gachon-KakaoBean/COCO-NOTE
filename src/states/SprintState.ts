import { atom, RecoilState } from 'recoil';
import { ChildType, TableData } from '@components/Sprint/type.ts';

const initialSprintValue: TableData[] = [
  {
    key: 'NoItem',
    sprintId: 999,
    sprintTitle: '스프린트를 추가해주세요',
    sprintDesc: '',
    startDate: '',
    startMonth: '',
    dueMonth: '',
    dueDate: '',
  },
];

const initialTaskValue: ChildType[] = [
  {
    taskId: '999',
    sprintTitle: '',
    taskDesc: '',
    workStatus: '',
    worker: { workerId: 0, workerName: '', workerThumbnailImg: '' },
  },
];
export const SprintValueState: RecoilState<TableData[]> = atom({
  key: 'SprintValueState',
  default: initialSprintValue,
});

export const AddSprintValue: RecoilState<boolean> = atom({
  key: 'AddSprint',
  default: false,
});

export const AddTaskValue: RecoilState<boolean> = atom({
  key: 'AddTask',
  default: false,
});

export const SelectedSprintState: RecoilState<TableData> = atom({
  key: 'SelectedSprintState',
  default: { ...initialSprintValue[0] },
});

export const SelectedTaskState: RecoilState<ChildType> = atom({
  key: 'SelectedTaskState',
  default: { ...initialTaskValue[0] },
});
