import { atom, RecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
interface IProjectValue {
  projectId: number;
  projectTitle: string;
  projectContent: string;
}

export interface ProjectKey {
  projectSecretKey: string;
}

const initialProjectValue: IProjectValue[] = [
  {
    projectId: 0,
    projectTitle: '프로젝트 명',
    projectContent: '설명',
  },
  {
    projectId: 1,
    projectTitle: '테스트 프로젝트',
    projectContent: '프로젝트에 대한 설명입니다.',
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

export const projectInfoMenuOpenState = atom({
  key: 'projectInfoMenuOpen',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const SelectedProjectState: RecoilState<IProjectValue> = atom({
  key: 'SelectedProject',
  default: { ...initialProjectValue[0] },
  effects_UNSTABLE: [persistAtom],
});
