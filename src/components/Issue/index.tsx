import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const Issue = () => {
  const data: DataType[] = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      key: i,
      name: `이름입니다 ${i}`,
      age: 32,
      address: `주소 ${i}`,
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
      onClick: () => {
        // record.key 값을 이용하여 해당 row의 세부 페이지로 이동하도록 구현
        console.log(`Go to detail page of row ${record.key}`);
      },
    };
  };

  return (
    <>
      <Wrapper>
        <div>
          <Link to="createissue">새 이슈 생성</Link>
        </div>
        <div>이슈 삭제</div>
        <div>이슈 수정</div>
        <div>이슈 필터 검색</div>
        <div>이슈 전체 보기</div>
        <div>이슈 열람</div>
        <div>이슈 댓글 작성</div>
        <div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} onRow={onRow} />
        </div>
      </Wrapper>
    </>
  );
};

export default Issue;
