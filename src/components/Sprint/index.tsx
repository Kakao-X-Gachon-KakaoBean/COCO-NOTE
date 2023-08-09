import { ColumnsType } from 'antd/es/table';
import { Button, Table } from 'antd';
import { ChildType, TableData } from '@components/Sprint/type.ts';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRecoilState } from 'recoil';
import {
  AddSprintValue,
  AddTaskValue,
  SelectedSprintId,
  SelectedTaskId,
  SprintValueState,
} from '@states/SprintState.ts';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetcher from '@utils/fetcher.ts';
import { useParams } from 'react-router';
import { useEffect } from 'react';

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
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const dateBeforeSixMonth = new Date(currentYear, currentMonth - 6, 1);
  const dateAfterTwelveMonth = new Date(currentYear, currentMonth + 12, 1);
  const parsedStartDate = new Date(startDate);
  const parsedDueDate = new Date(dueDate);

  return parsedStartDate >= dateBeforeSixMonth && parsedDueDate <= dateAfterTwelveMonth;
}

const Sprint = () => {
  const navigate = useNavigate();
  const id = useParams().projectId;
  const [dataSource, setDataSource] = useRecoilState(SprintValueState);
  const [isAddSprint, setIsAddSprint] = useRecoilState(AddSprintValue);
  const [isAddTask, setIsAddTask] = useRecoilState(AddTaskValue);
  const [, setSelectedSprintId] = useRecoilState(SelectedSprintId);
  const [, setSelectedTaskId] = useRecoilState(SelectedTaskId);

  const data = useQuery<TableData[]>(['sprintList'], () =>
    fetcher({
      queryKey: `http://localhost:8080/sprints?projectId=${id}`,
    })
  );

  useEffect(() => {
    if (isAddSprint || isAddTask) {
      data.refetch();
    }
  }, [data, isAddSprint, isAddTask]);

  useEffect(() => {
    if (data.data) {
      console.log(data.data);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ProcessingData(data.data);
    }
  }, [data.data]);

  function insertYInMonths(startDate: string, dueDate: string): { [key: string]: string } {
    const startYear = Number(startDate.split('-')[0]);
    const startMonth = Number(startDate.split('-')[1]);
    const dueYear = Number(dueDate.split('-')[0]);
    const dueMonth = Number(dueDate.split('-')[1]);

    const data: { [key: string]: string } = {};

    for (let year = startYear; year <= dueYear; year++) {
      const start = year === startYear ? startMonth : 1;
      const end = year === dueYear ? dueMonth : 12;

      for (let month = start; month <= end; month++) {
        data[`${year} ${month}월`] = 'Y';
      }
    }

    return data;
  }

  const ProcessingData = (data: { sprints: TableData[] }) => {
    const newDatasource: TableData[] = [];
    if (data.sprints.length === 0) {
      newDatasource.push({
        key: String(999),
        sprintId: 999,
        sprintTitle: '스프린트를 추가해주세요',
        startDate: '0000-00-00',
        dueDate: '0000-00-00',
      });
    } else {
      data.sprints.map((sprint: TableData, index: number) => {
        let newSprint: TableData = {
          sprintId: sprint.sprintId,
          sprintTitle: sprint.sprintTitle,
          startDate: sprint.startDate,
          dueDate: sprint.dueDate,
          key: String(index),
        };

        // Check if 'children' exists and has at least one task
        if (sprint.children && sprint.children.length > 0) {
          newSprint.children = sprint.children.map((child: ChildType) => ({
            ...child,
            sprintTitle: child.taskTitle, // Change field name from taskTitle to sprintTitle
          }));
        }

        const insertY = insertYInMonths(sprint.startDate, sprint.dueDate);
        newSprint = { ...newSprint, ...insertY };
        newDatasource.push(newSprint);
      });
    }
    setDataSource(newDatasource);
  };

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { sprintId, taskId } = record;
        return {
          children:
            sprintId && sprintId !== 999 ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  onClick={() => {
                    setSelectedSprintId(record.sprintId);
                    navigate(`${record.sprintId}/`);
                  }}
                >
                  {text}{' '}
                </div>
                <Button
                  onClick={() => {
                    setSelectedSprintId(record.sprintId);
                    setIsAddTask(true);
                  }}
                >
                  할일 추가
                </Button>
              </div>
            ) : taskId ? (
              <div
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setSelectedTaskId(record.taskId);
                  navigate(`tasks/${record.taskId}`);
                }}
              >
                {text}{' '}
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
        console.log(text);
        const cellStyle = {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
