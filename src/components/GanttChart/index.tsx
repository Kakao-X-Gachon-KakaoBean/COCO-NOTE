import { Table } from 'antd';
import { columns, data } from '@components/GanttChart/data.ts';

const GanttChart = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} scroll={{ x: '100vw', y: '500vh' }} />
    </>
  );
};

export default GanttChart;
