import React from 'react';
import { ColumnsType } from 'antd/es/table';

interface TableData {
  key: React.Key;
  sprint: string;
  startDate: string;
  dueDate: string;
  value: string;
}

export const columns: ColumnsType<TableData> = [
  {
    title: '스프린트',
    width: '12vw',
    dataIndex: 'sprint',
    key: 'sprint',
    fixed: 'left',
  },
];

export const data: TableData[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    sprint: `스프린트 ${i}`,
    startDate: '2023 2월',
    dueDate: '2023 3월',
    value: '', // 초기값을 빈 문자열로 설정합니다.
  });
}

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

for (let i = 0; i <= 24; i++) {
  const date = new Date(currentYear, currentMonth + i - 13, 1);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const title = `${year} ${month}`;
  columns.push({
    title: title,
    dataIndex: 'value',
    key: title,
    width: '12vw',
  });
}

for (let i = 0; i < columns.length; i++) {
  const column = columns[i];
  const title = column.title;
  if (title) {
    const [year, month] = title.toString().split(' ');
    const numYear = Number(year);
    const numMonth = Number(month);

    data.forEach(item => {
      const { startDate, dueDate } = item;
      const startYear = Number(startDate.split(' ')[0]);
      const startMonthIndex = Number(startDate.split(' ')[1].replace('월', ''));
      const dueYear = Number(dueDate.split(' ')[0]);
      const dueMonthIndex = Number(dueDate.split(' ')[1].replace('월', ''));

      if (startYear <= numYear && numYear <= dueYear && startMonthIndex <= numMonth && numMonth <= dueMonthIndex) {
        item.value = 'true';
      }
    });
  }
}
