import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { IssueCreateBtn, IssueHeader, IssueTable } from '@components/Issue/styles.tsx';

interface DataType {
  key: React.Key;
  name: string;
  email: number;
  position: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '이름',
    dataIndex: 'name',
  },
  {
    title: '이메일',
    dataIndex: 'email',
  },
  {
    title: '직위',
    dataIndex: 'position',
  },
];
const Issue = () => {
  const navigate = useNavigate();

  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      name: `이름입니다 ${i}`,
      email: 32,
      position: `주소 ${i}`,
    });
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onRow = (record: DataType) => {
    return {
      onClick: (): void => {
        navigate(`/issue/${record.key}`);
      },
    };
  };

  return (
    <>
      <Wrapper open={true}>
        <div style={{ padding: '1rem' }}>
          <IssueHeader>이슈</IssueHeader>
          <IssueTable>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              onRow={onRow}
              pagination={{ pageSize: 8 }}
            />
          </IssueTable>
          <IssueCreateBtn>
            <Button type="primary">
              <Link to="createissue">새 이슈 생성</Link>
            </Button>
          </IssueCreateBtn>
        </div>
      </Wrapper>
    </>
  );
};

export default Issue;
