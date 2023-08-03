import { ColumnsType } from 'antd/es/table';
import { Button, Table } from 'antd';
import { TableData } from '@components/Sprint/type.ts';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRecoilState } from 'recoil';
import { AddSprintValue, AddTaskValue, SelectedSprintState, SprintValueState } from '@states/SprintState.ts';

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

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

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

const Sprint = () => {
  const [dataSource, setDataSource] = useRecoilState(SprintValueState);
  const [, setIsAddSprint] = useRecoilState(AddSprintValue);
  const [, setIsAddTask] = useRecoilState(AddTaskValue);
  const [, setSelectedSprint] = useRecoilState(SelectedSprintState);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );
  const columns: ColumnsType<TableData> = [
    {
      title: '스프린트',
      width: '20vw',
      dataIndex: 'sprintTitle',
      key: 'sprintTitle',
      fixed: 'left',
      render: (text: string, record: TableData) => {
        const { sprintId } = record;
        return {
          children:
            sprintId && sprintId !== 999 ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {text}{' '}
                <Button
                  onClick={() => {
                    setIsAddTask(true);
                    setSelectedSprint(record);
                  }}
                >
                  할일 추가
                </Button>
              </div>
            ) : (
              <div>{text}</div>
            ),
        };
      },
    },
  ];
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

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource(prev => {
        const activeIndex = prev.findIndex(i => i.key === active.id);
        const overIndex = prev.findIndex(i => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  //const sortableItems = useMemo(() => datasource.map(item => item.key), [datasource]);

  console.log(dataSource);
  return (
    <>
      <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          // rowKey array
          items={dataSource.map(i => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: '100vw', y: '65vh' }}
          />{' '}
          <Button onClick={() => setIsAddSprint(true)}>스프린트 추가하기</Button>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default Sprint;
