import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import { ComponentWrapper, HorizontalLine, MemberList, Text, Wrapper } from '@pages/ProjectInfo/styles.tsx';
import SideDetailBar from '@components/SideDetailBar';
import { SelectedProjectState } from '@states/ProjectState.ts';
import { useRecoilValue } from 'recoil';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { TableHead } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';

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

const ProjectInfo = () => {
  const selectedProject = useRecoilValue(SelectedProjectState);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows] = useState([
    { name: '추성준', email: 'j949854@gmail.com', position: '관리자' },
    { name: '조연겸', email: 'j949854@gmail.com', position: '방문자' },
    { name: '김윤호', email: 'j949854@gmail.com', position: '방문자' },
    { name: '안수빈', email: 'j949854@gmail.com', position: '멤버' },
    { name: '김희찬', email: 'j949854@gmail.com', position: '멤버' },
    { name: '인범시치', email: 'j949854@gmail.com', position: '방문자' },
    {
      name: 'Ice cream sandwich',
      email: 'j949854@gmail.com',
      position: '방문자',
    },
    { name: 'Jelly Bean', email: 'j949854@gmail.com', position: '멤버' },
    { name: 'KitKat', email: 'j949854@gmail.com', position: '멤버' },
    { name: 'Lollipop', email: 'j949854@gmail.com', position: '멤버' },
  ]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar open={true} />
      <Wrapper>
        <ComponentWrapper>
          <Text>프로젝트 이름</Text>
          <Text className={'title'}>{selectedProject.projectTitle}</Text>
          <Text>프로젝트 설명</Text>
          <Text className={'contents'}>{selectedProject.projectContent}</Text>
          <HorizontalLine />
          <Text>프로젝트 멤버 리스트</Text>
          <MemberList>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                  <TableRow sx={{ background: 'gray' }}>
                    <TableCell align="left">이름</TableCell>
                    <TableCell align="center">이메일</TableCell>
                    <TableCell align="center">직위</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                    row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell style={{ width: 300 }} align="center">
                          {row.email}
                        </TableCell>
                        <TableCell style={{ width: 160, paddingRight: 16 }} align="center">
                          {row.position}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                      onPageChange={handleChangePage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </MemberList>
        </ComponentWrapper>
      </Wrapper>
    </>
  );
};

export default ProjectInfo;
