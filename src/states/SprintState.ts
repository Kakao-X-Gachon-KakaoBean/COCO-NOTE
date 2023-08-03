import { atom, RecoilState } from 'recoil';
import { TableData } from '@components/Sprint/type.ts';

const initialSprintValue: TableData[] = [
  {
    key: 'NoItem',
    sprintId: 999,
    sprintTitle: '스프린트를 추가해주세요',
    sprintDesc: '',
    startDate: '',
    dueDate: '',
  },
];
export const SprintValueState: RecoilState<TableData[]> = atom({
  key: 'SprintValueState',
  default: initialSprintValue,
});

export const SelectedSprintState: RecoilState<TableData> = atom({
  key: 'SelectedSprintState',
  default: { ...initialSprintValue[0] },
});
