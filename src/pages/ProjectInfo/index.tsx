import {
  MemberHeader,
  MemberHeaderLeft,
  MemberList,
  MemberSection,
  ProfileImg,
  ProfileNName,
  ProjectBody,
  ProjectBodyExplain,
  ProjectBodyTitle,
  ProjectHeader,
  ProjectSection,
  ProjectSubMit,
} from '@/pages/ProjectInfo/styles.tsx';
import defaultImage from '@/images/defaultAvatar.png';

import { Button, Divider } from 'antd';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import React, { useEffect, useState } from 'react';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { CloseOutlined } from '@ant-design/icons';
import { TableHead } from '@mui/material';
import { useQuery } from 'react-query';
import { ProjectData, projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { useRecoilValue } from 'recoil';
import { ActivityIndicator } from '@components/ActivityIndicator';
import fetcher from '@utils/fetcher.ts';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProjectInfo = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const projectId: string | undefined = useParams().projectId;

  const { isLoading, data: projectData } = useQuery<ProjectData>(['projectinfo', projectId], () =>
    fetcher({
      queryKey: `${BACKEND_URL}/projects/${projectId}`,
    })
  );

  console.log(projectData);

  const [memberList, setMemberList] = useState<
    Array<{
      name: string;
      email: string;
      position: string;
      memberThumbnailImg: string;
    }>
  >([]);

  useEffect(() => {
    if (projectData && projectData.projectMembers) {
      const newMember = projectData.projectMembers.map(member => ({
        id: member.projectMemberId,
        name: member.projectMemberName,
        email: member.projectMemberEmail,
        position: member.projectMemberRole,
        memberThumbnailImg: member.memberThumbnailImg,
      }));
      setMemberList(newMember);
    }
  }, [projectData]);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - memberList.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      {isVisible && !isLoading && projectData && projectData.projectMembers ? (
        <Wrapper>
          <ProjectSection>
            <Button type="primary" shape="circle" icon={<CloseOutlined />} />
            <ProjectHeader>
              <div>프로젝트 정보</div>
            </ProjectHeader>
            <ProjectBody>
              <ProjectBodyTitle>
                <div>프로젝트 이름</div>
                <div>{projectData?.projectTitle}</div>
              </ProjectBodyTitle>
              <ProjectBodyExplain>
                <div>프로젝트 설명</div>
                <div>{projectData?.projectContent}</div>
              </ProjectBodyExplain>
            </ProjectBody>
            <ProjectSubMit></ProjectSubMit>
          </ProjectSection>
          <Divider />
          <MemberSection>
            <MemberHeader>
              <MemberHeaderLeft>구성원 관리</MemberHeaderLeft>
            </MemberHeader>
            <MemberList>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                  <TableHead>
                    <TableRow sx={{ background: '#f5f5f8' }}>
                      <TableCell align="left">이름</TableCell>
                      <TableCell align="center">이메일</TableCell>
                      <TableCell align="center">직위</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? memberList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : memberList
                    ).map(memberList => (
                      <TableRow key={memberList.name}>
                        <TableCell component="th" scope="row">
                          <ProfileNName>
                            <ProfileImg
                              src={
                                memberList.memberThumbnailImg !== null ? memberList.memberThumbnailImg : defaultImage
                              }
                            />
                            {memberList.name}
                            {memberList.position === 'ADMIN' && (
                              <FontAwesomeIcon icon={faCrown} style={{ color: 'yellow', marginRight: 5 }} />
                            )}
                          </ProfileNName>
                        </TableCell>
                        <TableCell style={{ width: 300 }} align="center">
                          {memberList.email}
                        </TableCell>
                        <TableCell style={{ width: 160, paddingRight: 16 }} align="center">
                          {memberList.position}
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={memberList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </MemberList>
          </MemberSection>
        </Wrapper>
      ) : (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      )}
    </>
  );
};

export default ProjectInfo;
