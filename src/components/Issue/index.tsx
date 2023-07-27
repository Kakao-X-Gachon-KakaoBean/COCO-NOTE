import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IssueCreateBtn, IssueHeader, IssueTable } from '@components/Issue/styles.tsx';
import { useRecoilValueLoadable } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { ActivityIndicator } from '@components/ActivityIndicator';

interface DataType {
  key: React.Key;
  issue: string;
  version: string;
  name: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '이슈 제목',
    dataIndex: 'issue',
  },
  {
    title: '버전',
    dataIndex: 'version',
  },
  {
    title: '작성자',
    dataIndex: 'name',
  },
];
const Issue = () => {
  const navigate = useNavigate();

  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      issue: `이슈 제목 ${i}`,
      version: `${i}`,
      name: `사람 이름 ${i}`,
    });
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);

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
        navigate(`${record.key}`);
      },
    };
  };

  const goCreateIssue = () => {
    navigate('createIssue');
  };

  let contents = null;

  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
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
                <Button type="primary" onClick={goCreateIssue}>
                  새 이슈 생성
                </Button>
              </IssueCreateBtn>
            </div>
          );
        } else {
          return <ActivityIndicator />;
        }
      };
      break;
    case 'hasError':
      contents = () => {
        return <div>데이터를 서버에서 불러올 수 없습니다.</div>;
      };
      break;
    case 'loading':
      contents = () => {
        return <ActivityIndicator />;
      };
      break;
    default:
      contents = () => {
        return <div>에러가 발생했습니다. 페이지를 새로고침해주세요.</div>;
      };
  }

  return (
    <>
      <Wrapper>{contents()}</Wrapper>
    </>
  );
};

export default Issue;
