import { Table } from 'antd';
import { columns, data } from '@components/GanttChart/data.ts';

const GanttChart = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: '100vw', y: '65vh' }} />
    </>
  );
};

export default GanttChart;
