import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { TableData } from '@components/Sprint/type.ts';

// 나중에 tasks/taskTitle 스프린트로 이름 바꿔주기
// const json = { /* JSON 객체 데이터 */ };
//
// // sprintTitle로 변경된 tasks 배열 생성
// const modifiedTasks = json.tasks.map(task => ({
//   ...task,
//   sprint: task.taskTitle, // taskTitle 값을 sprint로 변경
//   taskTitle: undefined, // taskTitle 필드 삭제 (선택 사항)
// }));
//
// // sprintTitle로 변경된 JSON 객체 생성
// const modifiedJson = {
//   ...json,
//   tasks: modifiedTasks,
// };

const columns: ColumnsType<TableData> = [
  {
    title: '스프린트',
    width: '12vw',
    dataIndex: 'sprintTitle',
    key: 'sprintTitle',
    fixed: 'left',
  },
];

const index: TableData[] = [];
for (let i = 0; i < 3; i++) {
  index.push({
    sprintId: i,
    sprintTitle: `스프린트 ${i}`,
    sprintDesc: '',
    startDate: `2023 ${i + 5}월`,
    dueDate: `2023 ${i + 7}월`,
  });
}
index.push({
  sprintId: 9,
  sprintTitle: `UI/UX 설계`,
  sprintDesc: '',
  startDate: `2023 8월`,
  dueDate: `2023 9월`,
  children: [
    {
      taskId: 91,
      sprintTitle: '하위 항목 1',
      taskDesc: '',
      status: '진행중',
      worker: { workerId: 3, workerName: '조연겸', workerProfile: 'aakkalwegkgkwk' },
    },
    {
      taskId: 92,
      sprintTitle: '하위 항목 2',
      taskDesc: '',
      status: '해야할 일',
      worker: { workerId: 5, workerName: '인범시치', workerProfile: 'gggg' },
    },
  ],
});

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

function isWithinRange(startDate: string, dueDate: string): boolean {
  const dateBeforeSixMonth = new Date(currentYear, currentMonth - 7, 1);
  const startMonth = dateBeforeSixMonth.toLocaleString('default', { month: 'long' });
  const startYear = dateBeforeSixMonth.getFullYear();
  const rangeStart = `${startYear} ${startMonth}`;

  const dateAfterTwlvMonth = new Date(currentYear, currentMonth + 11, 1);
  const endMonth = dateAfterTwlvMonth.toLocaleString('default', { month: 'long' });
  const endYear = dateAfterTwlvMonth.getFullYear();
  const rangeEnd = `${endYear} ${endMonth}`;

  return startDate >= rangeStart && dueDate <= rangeEnd;
}

for (let i = 0; i <= 18; i++) {
  const date = new Date(currentYear, currentMonth + i - 7, 1);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const title = `${year} ${month}`;
  columns.push({
    title: title,
    dataIndex: title,
    key: title,
    width: '12vw',
    render: (text: string, record: TableData) => {
      console.log(text);
      const { startDate, dueDate } = record;
      const cellStyle = {
        background: record[title] === 'Y' && isWithinRange(startDate, dueDate) ? '#23c483' : 'white',
      };

      return {
        props: {
          style: cellStyle,
        },
        children: <div></div>,
      };
    },
  });
}
function removeMonthSuffix(monthString: string | undefined): number {
  if (monthString === undefined) {
    return 999;
  }
  return Number(monthString.replace('월', ''));
}

for (let i = 0; i < columns.length; i++) {
  const column = columns[i];
  const title = column.title;
  if (title) {
    const [year, month] = title.toString().split(' ');
    const numYear = Number(year);
    const numMonth = removeMonthSuffix(month);

    index.forEach(item => {
      const { startDate, dueDate } = item;
      const startYear = Number(startDate.split(' ')[0]);
      const startMonthIndex = Number(startDate.split(' ')[1].replace('월', ''));
      const dueYear = Number(dueDate.split(' ')[0]);
      const dueMonthIndex = Number(dueDate.split(' ')[1].replace('월', ''));

      if (startYear <= numYear && numYear <= dueYear && startMonthIndex <= numMonth && numMonth <= dueMonthIndex) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        item[column.title] = 'Y'; // 해당 열의 데이터에 'Y' 값을 넣습니다.
        //console.log(column.title);
      }
    });
  }
}

const Sprint = () => {
  return (
    <>
      <Table columns={columns} dataSource={index} pagination={false} scroll={{ x: '100vw', y: '65vh' }} />
    </>
  );
};

export default Sprint;
