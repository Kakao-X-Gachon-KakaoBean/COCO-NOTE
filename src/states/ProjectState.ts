import { atom, RecoilState } from 'recoil';

interface IProjectValue {
  projectId: number;
  projectTitle: string;
  projectContent: string;
}

const initialProjectValue: IProjectValue[] = [
  {
    projectId: 0,
    projectTitle: '프로젝트 명',
    projectContent: '설명',
  },
];

export const projectValueState: RecoilState<IProjectValue[]> = atom({
  key: 'ProjectValueState',
  default: initialProjectValue,
});

export const AddProjectClickState: RecoilState<boolean> = atom({
  key: 'AddProject',
  default: false,
});

export const SelectedProjectState: RecoilState<IProjectValue> = atom({
  key: 'SelectedProject',
  default: { ...initialProjectValue[0] },
});
