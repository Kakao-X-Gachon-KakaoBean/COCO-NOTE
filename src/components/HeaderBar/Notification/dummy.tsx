import { SmileOutlined } from '@ant-design/icons';

export const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        첫번째 알림입니다.
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        두번째 알림입니다. (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3번째 알림입니다.
      </a>
    ),
    disabled: false,
  },
  {
    key: '4',
    danger: true,
    label: '경고 알림입니다.',
  },
  {
    key: '5',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        다섯번째 알림입니다.
      </a>
    ),
  },
  {
    key: '6',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        여섯번째 알림입니다.
      </a>
    ),
  },
  {
    key: '7',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        일곱번째 알림입니다.
      </a>
    ),
  },
  {
    key: '8',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        여덟번째 알림입니다.
      </a>
    ),
  },
  {
    key: '9',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        아홉번째 알림입니다.
      </a>
    ),
  },
  {
    key: '10',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        열번째 알림입니다.
      </a>
    ),
  },
];
