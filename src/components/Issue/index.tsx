import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IssueCreateBtn, IssueHeader, IssueTable } from '@components/Issue/styles.tsx';
import { useRecoilValue } from 'recoil';
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
    title: '번호',
    dataIndex: 'version',
    width: '10%',
    align: 'center',
  },
  {
    title: '이슈 제목',
    dataIndex: 'issue',
    width: '60%',
  },
  {
    title: '작성자',
    dataIndex: 'name',
    width: '30%',
    align: 'center',
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
  const projectInfoMenuOpen = useRecoilValue(projectInfoMenuOpenState);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!projectInfoMenuOpen) {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 550);
    }
  }, [projectInfoMenuOpen]);

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

  return (
    <>
      {isVisible ? (
        <Wrapper>
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
        </Wrapper>
      ) : (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      )}
    </>
  );
};

export default Issue;
