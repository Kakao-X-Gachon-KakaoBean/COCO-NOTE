import { Wrapper } from '@/styles/DetailSide/styles.tsx';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IssueBottom, IssueButton, IssueCreateBtn, IssueHeader, IssueTable } from '@/components/Issue/styles.tsx';
import { useRecoilValueLoadable } from 'recoil';
import { projectInfoMenuOpenState } from '@/states/ProjectState.ts';
import { ActivityIndicator } from '@/components/ActivityIndicator';
import { useQuery, useQueryClient } from 'react-query';
import fetcher from '@/utils/fetcher.ts';
import { IssueDataType, IssueList } from '@/types/IssueType.ts';
import { useParams } from 'react-router';
import { fetchPage } from '@/api/Issue/Issue.ts';
import { BACKEND_URL } from '@/api';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const columns: ColumnsType<IssueDataType> = [
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
  const projectId: string | undefined = useParams().projectId;
  const [currentPage, setCurrentPage] = useState(0);
  const queryClint = useQueryClient();
  const maxPostPage = 10;

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClint.prefetchQuery(['issueList', nextPage], () => fetchPage(projectId, nextPage));
    }
  }, [currentPage, queryClint, projectId]);

  const { isLoading, data: issuedata } = useQuery<IssueList>(
    ['issueList', currentPage],
    () =>
      fetcher({
        queryKey: `${BACKEND_URL}/issues/page?projectId=${projectId}&page=${currentPage}`,
      }),
    { keepPreviousData: true }
  );

  const [issueList, setIssueList] = useState<IssueDataType[]>([]);

  useEffect(() => {
    if (issuedata && issuedata.issues) {
      const newList = issuedata?.issues.map(issue => ({
        key: issue.id,
        issue: issue.title,
        version: issue.id,
        name: issue.writerName,
      }));
      setIssueList(newList);
    }
  }, [issuedata]);

  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);

  const onRow = (record: IssueDataType) => {
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
  if (isLoading) {
    return <h3>Loading....</h3>;
  }

  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <div style={{ padding: '1rem' }}>
              <IssueHeader>이슈</IssueHeader>
              <IssueTable>
                <Table columns={columns} dataSource={issueList} onRow={onRow} pagination={false} />
              </IssueTable>
              <IssueBottom>
                <IssueButton
                  disabled={currentPage <= 0}
                  onClick={() => {
                    setCurrentPage(prev => prev - 1);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </IssueButton>
                <span>Page {currentPage}</span>
                <IssueButton
                  disabled={issuedata?.finalPage === true}
                  onClick={() => {
                    setCurrentPage(prev => prev + 1);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </IssueButton>
              </IssueBottom>
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
