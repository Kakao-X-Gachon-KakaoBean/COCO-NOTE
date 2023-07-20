// type DataNode = {
//   key: Key;
//   title: React.ReactNode;
//   children?: DataNode[];
//   [prop: string]: any;
// };
//
// type Key = string | number;
import { DataNode } from 'antd/es/tree';

export const treeData: DataNode[] = [
  {
    title: '1.0 사용자 개인 정보 관련 버그 수정',
    key: '1.0',
    children: [
      {
        title: '1.1 로그인 시 사용자 개인 정보 보호',
        key: '1.1',
      },
      {
        title: '1.2 회원가입 시 개인 정보 요청 방식 수정',
        key: '1.2',
      },
      {
        title: '1.3 사용자 찾기 버그 수정',
        key: '1.3',
      },
    ],
  },
  {
    title: '2.0 헤더바 시각화',
    key: '2.0',
    children: [
      {
        title: '2.1 헤더바 반응형 디자인 수정',
        key: '2.1',
      },
    ],
  },
];
