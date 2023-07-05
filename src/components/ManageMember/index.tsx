import {
  MemberHeader,
  MemberHeaderLeft,
  MemberHeaderRight,
  MemberList,
  MemberSection,
  MemberSubmit,
  MemberSave,
} from "@components/ManageMember/styles.tsx";

import { Select } from "antd";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import React, { useCallback, useState } from "react";
import { Wrapper } from "@styles/DefaultSide/styles.tsx";
import HeaderBar from "@components/HeaderBar";
import SideBar from "@components/SideBar";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { TableHead } from "@mui/material";
import useInput from "../../hooks/useInput.ts";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Memeber } from "../../States/MemberState.ts";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const ManageMember = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, onChangeEmail, setEmail] = useInput("");

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };
  function createData(name: string, email: number, position: string) {
    return { name, email, position };
  }
  const rows = [
    createData("추성준", 1, "관리자"),
    createData("조연겸", 2, "방문자"),
    createData("김윤호", 3, "방문자"),
    createData("안수빈", 4, "멤버"),
    createData("김희찬", 5, "멤버"),
    createData("인범시치", 6, "방문자"),
    createData("Ice cream sandwich", 237, "방문자"),
    createData("Jelly Bean", 375, "멤버"),
    createData("KitKat", 518, "멤버"),
    createData("Lollipop", 392, "멤버"),
  ].sort((a, b) => (a.email < b.email ? -1 : 1));

  const SelectOption = [
    {
      value: "관리자",
      label: "관리자",
    },
    {
      value: "멤버",
      label: "멤버",
    },
    {
      value: "구경",
      label: "구경",
    },
  ];
  const mutation = useMutation<Memeber, AxiosError, { email: string }>(
    "SubmitEmail",
    (data) =>
      axios
        .post(`localhost:3000/local/login`, data, {
          withCredentials: true,
        })
        .then((response) => response.data),
    {
      onMutate() {},
      onSuccess(data) {
        setEmail("");
      },
      onError(error) {
        console.log(error);
        alert("전송에 실패하였습니다.");
      },
    }
  );

  //이메일로 초대 보내기
  const onSubmitEmail = useCallback(
    (e: any) => {
      e.preventDefault();
      mutation.mutate({ email });
    },
    [email, mutation]
  );

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <HeaderBar />
      <SideBar />
      <Wrapper>
        <MemberSection>
          <MemberHeader>
            <MemberHeaderLeft>멤버 관리</MemberHeaderLeft>
            <MemberHeaderRight>
              <Button type="primary" shape="circle" icon={<CloseOutlined />} />
            </MemberHeaderRight>
          </MemberHeader>
          <MemberSubmit>
            <Button
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              추가
            </Button>
          </MemberSubmit>
          <MemberList>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow sx={{ background: "gray" }}>
                    <TableCell align="left">이름</TableCell>
                    <TableCell align="center">이메일</TableCell>
                    <TableCell align="center">직위</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell style={{ width: 300 }} align="center">
                        {row.email}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        <Select
                          labelInValue
                          defaultValue={{
                            value: row.position,
                            label: row.position,
                          }}
                          style={{ width: 120 }}
                          onChange={handleChange}
                          options={SelectOption}
                        />
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
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
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
            <Button type="primary" size={"large"}>
              저장
            </Button>
          </MemberSave>
        </MemberSection>
        <Modal
          title="인원 추가히기"
          open={isModalOpen}
          onCancel={handleOk}
          // footer={[<div>이메일 입력</div>]}
          centered
        >
          <p>이메일 입력</p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Input
              type="text"
              value={email}
              onChange={onChangeEmail}
              placeholder="이메일"
            />
            <Button
              type="primary"
              style={{ width: "5rem" }}
              onClick={onSubmitEmail}
            >
              전송
            </Button>
          </div>
        </Modal>
      </Wrapper>
    </>
  );
};

export default ManageMember;
