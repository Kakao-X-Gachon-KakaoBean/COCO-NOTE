import {
  MemberHeader,
  MemberHeaderLeft,
  MemberHeaderRight,
  MemberList,
  MemberSection,
  MemberSubmit,
  MemberSave,
  ProjectSection,
  ProjectBody,
  ProjectHeader,
  ProjectSubMit,
  ProjectBodyTitle,
  ProjectBodyExplain,
} from '@components/ManageMember/styles.tsx';

import { Select, Button, Input, Modal } from 'antd';

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
import React, { useCallback, useState } from 'react';
import { Wrapper } from '@styles/DefaultSide/styles.tsx';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import { CloseOutlined } from '@ant-design/icons';
import { TableHead } from '@mui/material';
import useInput from '../../hooks/useInput.ts';
import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { MemberState } from '@states/MemberState.ts';

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

const ManageMember = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [invitationModalOpen, SetInvitationModalOpen] = useState(false);
  const [projectModalOpen, SetProjectModalOpen] = useState(false);
  const [email, onChangeEmail, setEmail] = useInput('');
  const [emails, setEmails] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const { TextArea } = Input;

  const [rows, setRows] = useState([
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

  const SelectOption = [
    {
      value: '관리자',
      label: '관리자',
    },
    {
      value: '멤버',
      label: '멤버',
    },
    {
      value: '구경',
      label: '구경',
    },
  ];

  const handleChange = (value: { value: string; label: React.ReactNode }, i: number) => {
    const newRows = [...rows];
    newRows[i].position = value.value;
    setRows(newRows);
    console.log(rows);
  };

  const handleDelete = (i: number) => {
    const newRows = [...rows];
    newRows.splice(i, 1);
    setRows(newRows);
  };

  const handleInvitation = () => {
    SetInvitationModalOpen(false);
  };

  const handleProject = () => {
    SetProjectModalOpen(false);
  };

  const mutation = useMutation<MemberState, AxiosError, { email: string }>(
    'SubmitEmail',
    data =>
      axios
        .post(`localhost:3000/local/login`, data, {
          withCredentials: true,
        })
        .then(response => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        setEmail('');
      },
      onError(error) {
        console.log(error);
        alert('전송에 실패하였습니다.');
      },
    }
  );

  const addEmail = () => {
    const newEmail = [...emails, email];
    const checkEmail = Array.from(new Set(newEmail));
    setEmails(checkEmail);
    setEmail('');
  };
  const deleteEmails = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  //이메일로 초대 보내기
  const onSubmitEmail = useCallback(
    (e: any) => {
      e.preventDefault();
      mutation.mutate({ email });
    },
    [email, mutation]
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
      <Wrapper>
        <ProjectSection>
          <ProjectHeader>프로젝트 정보</ProjectHeader>
          <ProjectBody>
            <ProjectBodyTitle>{title}</ProjectBodyTitle>
            <ProjectBodyExplain>{contents}</ProjectBodyExplain>
          </ProjectBody>
          <ProjectSubMit>
            <Button type="primary" size="large" onClick={() => SetProjectModalOpen(true)}>
              프로젝트 정보 수정
            </Button>
          </ProjectSubMit>
        </ProjectSection>
        <MemberSection>
          <MemberHeader>
            <MemberHeaderLeft>멤버 관리</MemberHeaderLeft>
            <MemberHeaderRight>
              <Button type="primary" shape="circle" icon={<CloseOutlined />} />
            </MemberHeaderRight>
          </MemberHeader>
          <MemberSubmit>
            <Button type="primary" size="large" onClick={() => SetInvitationModalOpen(true)}>
              추가
            </Button>
          </MemberSubmit>
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
                    (row, i) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell style={{ width: 300 }} align="center">
                          {row.email}
                        </TableCell>
                        <TableCell style={{ width: 160, paddingRight: 16 }} align="center">
                          <Select
                            labelInValue
                            defaultValue={{
                              value: row.position,
                              label: row.position,
                            }}
                            style={{ width: 80, marginRight: 10 }}
                            onChange={value => handleChange(value, i)}
                            options={SelectOption}
                          />
                          <CloseOutlined onClick={() => handleDelete(i)} />
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
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </MemberList>
          <MemberSave>
            <Button type="primary" size={'large'}>
              멤버 정보 저장
            </Button>
          </MemberSave>
          <Button type="primary" danger size={'large'}>
            프로젝트 삭제
          </Button>
        </MemberSection>
        <Modal
          title="인원 추가히기"
          open={invitationModalOpen}
          onCancel={handleInvitation}
          footer={
            <Button type="primary" style={{ width: '5rem' }} onClick={onSubmitEmail}>
              전송
            </Button>
          }
          centered
        >
          <p>이메일 입력</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input type="text" value={email} onChange={onChangeEmail} placeholder="이메일" />
            <div>
              {emails.map((email, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ marginRight: '1rem' }}>{email}</div>
                  <CloseOutlined onClick={() => deleteEmails(index)} />
                </div>
              ))}
            </div>

            <Button type="primary" onClick={addEmail}>
              추가
            </Button>
          </div>
        </Modal>
        <Modal
          title="프로젝트 정보 변경"
          open={projectModalOpen}
          onCancel={handleProject}
          footer={
            <div>
              <Button key="submit" type="primary">
                OK
              </Button>
            </div>
          }
        >
          <TextArea
            value={title}
            autoSize={{ minRows: 1, maxRows: 10 }}
            onChange={e => setTitle(e.target.value)}
            placeholder="프로젝트 명"
            style={{ marginBottom: '2rem', marginTop: '3rem' }}
          />
          <TextArea
            value={contents}
            autoSize={{ minRows: 3, maxRows: 10 }}
            onChange={e => setContents(e.target.value)}
            placeholder="프로젝트 설명"
            style={{ marginBottom: '2rem' }}
          />
        </Modal>
      </Wrapper>
    </>
  );
};

export default ManageMember;
