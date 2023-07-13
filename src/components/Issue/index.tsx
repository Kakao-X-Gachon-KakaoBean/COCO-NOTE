import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

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
  for (let i = 0; i < 5; i++) {
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
      <Wrapper>
        <div>
          <Link to="createissue">새 이슈 생성</Link>
        </div>
        <div>이슈 필터 검색</div>
        <div>이슈 댓글 작성</div>
        <div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} onRow={onRow} />
        </div>
      </Wrapper>
    </>
  );
};

export default Issue;
