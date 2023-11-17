import {
  MemberHeader,
  MemberHeaderLeft,
  MemberHeaderRight,
  MemberList,
  MemberSection,
  ProfileImg,
  ProfileNName,
  ProjectBody,
  ProjectBodyExplain,
  ProjectBodyTitle,
  ProjectHeader,
  ProjectSection,
} from '@components/ManageMember/styles.tsx';

import { Button, Divider, Input, Modal, Select } from 'antd';
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
import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { CloseOutlined } from '@ant-design/icons';
import { TableHead } from '@mui/material';
import useInput from '../../hooks/useInput.ts';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { projectInfoMenuOpenState, SelectedProjectState } from '@states/ProjectState.ts';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { ActivityIndicator } from '@components/ActivityIndicator';
import { toast } from 'react-toastify';
import fetcher from '@utils/fetcher.ts';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { deleteMember, editProjectInfo, inviteMember, modifyMemberRole } from '@api/Project/ManagePage.ts';
import defaultImage from '@images/defaultAvatar.png';
import { BACKEND_URL } from '@api';
import { EditProject, ModifyMember, ProjectData } from '@type/ProjectType.ts';
import { GoMain } from '@hooks/GoMain.ts';

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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modifiedData, setModifiedData] = useState<Array<{ modifyProjectMemberId: number; projectRole: string }>>([]);
  const [, setProjectInfoMenuOpen] = useRecoilState(projectInfoMenuOpenState);
  const resetSelectedProject = useResetRecoilState(SelectedProjectState);

  const { TextArea } = Input;

  const projectId: string | undefined = useParams().projectId;

  const queryClient = useQueryClient();

  const projectInfoInvalidate = (): void => {
    queryClient.invalidateQueries('projectinfo');
  };

  const projectListInvalidate = (): void => {
    queryClient.invalidateQueries('projectList');
  };

  const { isLoading, data: projectData } = useQuery<ProjectData>(['projectinfo'], () =>
    fetcher({
      queryKey: `${BACKEND_URL}/projects/${projectId}`,
    })
  );
  const message = (message: string) => <div style={{ fontSize: '1rem' }}>{message}</div>;

  const [memberList, setMemberList] = useState<
    Array<{
      id: number;
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

  const SelectOption = [
    {
      value: 'ADMIN',
      label: '관리자',
    },
    {
      value: 'MEMBER',
      label: '멤버',
    },
    {
      value: 'VIEWER',
      label: '방문자',
    },
    {
      value: 'INVITED_PERSON',
      label: '초대된 사람',
    },
    {
      value: 'LEFT_MEMBER',
      label: '추방된 사람',
    },
  ];
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

  const handleChange = (value: { value: string; label: React.ReactNode }, i: number) => {
    const newRows = memberList
      .filter((row, index) => {
        if (i === index) {
          const newRole = value.value;
          if (newRole !== row.position) {
            return true;
          }
        }
        return false;
      })
      .map(row => {
        return {
          modifyProjectMemberId: row.id,
          projectRole: row.position,
        };
      });

    const updatedRows = [...memberList];
    updatedRows[i].position = value.value;
    setMemberList(updatedRows);

    setModifiedData(prevData => {
      const newData = prevData.filter(item => item.modifyProjectMemberId !== newRows[0].modifyProjectMemberId);
      newData.push({
        modifyProjectMemberId: updatedRows[i].id,
        projectRole: updatedRows[i].position,
      });
      return newData;
    });
  };

  const handleInvitation = () => {
    SetInvitationModalOpen(false);
  };

  const handleProject = () => {
    SetProjectModalOpen(false);
  };

  const EditProjectInfoMutation = useMutation<'정보 수정 성공' | '정보 수정 실패', AxiosError, EditProject>(
    'editProjectInfo',
    (data: EditProject) => editProjectInfo(projectId, data), // 함수를 반환하도록 수정
    {
      onSuccess: data => {
        if (data === '정보 수정 성공') {
          toast(message('정보를 수정하였습니다.'), {
            type: 'success',
          });
          projectInfoInvalidate();
          projectListInvalidate();
          setTitle('');
          setContent('');
          SetProjectModalOpen(false);
        } else {
          toast(message('정보 수정에 실패하였습니다.'), { type: 'error' });
        }
      },
      onError: () => {
        toast.error('서버와 연결이 되어있지 않습니다.');
      },
    }
  );

  const ModifyMemberRole = useMutation<'권한 수정 성공' | '권한 수정 실패', AxiosError, ModifyMember>(
    'modifyMemberRole',
    (data: ModifyMember) => modifyMemberRole(projectId, data), // 함수를 반환하도록 수정
    {
      onSuccess: data => {
        if (data === '권한 수정 성공') {
          toast(message('권한을 수정하였습니다.'), {
            type: 'success',
          });
          setModifiedData([]);
          projectInfoInvalidate();
        } else {
          toast(message('권한 수정에 실패하였습니다.'), { type: 'error' });
        }
      },
      onError: () => {
        toast.error('서버와 연결이 되어있지 않습니다.');
      },
    }
  );

  const modifyMember = useCallback(
    (e: any) => {
      e.preventDefault();
      ModifyMemberRole.mutate({ modifyProjectMemberRole: modifiedData });
    },
    [modifiedData, ModifyMemberRole]
  );

  const editProject = useCallback(
    (e: any) => {
      e.preventDefault();
      EditProjectInfoMutation.mutate({ newTitle: title, newContent: content });
    },
    [title, content, EditProjectInfoMutation]
  );
  const GotoMain = GoMain();
  const deleteMutation = useMutation<'삭제 성공' | '삭제 실패', AxiosError>(
    'deleteMember',
    () => deleteMember(projectId),
    {
      onSuccess: async data => {
        if (data === '삭제 성공') {
          toast.success('삭제되었습니다.');
          queryClient.invalidateQueries('projectinfo');
          GotoMain().catch(error => console.error('Error navigating:', error));
        } else {
          toast.error('삭제 실패하였습니다.');
        }
      },
      onError: () => {
        toast.error('서버와 연결이 되어있지 않습니다.');
      },
    }
  );

  const deleteProject = useCallback(() => {
    deleteMutation.mutate();
  }, [deleteMutation]);

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

  const inviteMemberMutation = useMutation<
    '멤버 초대 성공' | '멤버 초대 실패',
    AxiosError,
    { invitedMemberEmails: string[] }
  >(
    'inviteMember',
    (data: { invitedMemberEmails: string[] }) => inviteMember(projectId, data), // 함수를 반환하도록 수정
    {
      onSuccess: data => {
        if (data === '멤버 초대 성공') {
          toast(message('초대를 완료했습니다.'), {
            type: 'success',
          });
          projectInfoInvalidate();
          setEmail('');
          setEmails([]);
          SetInvitationModalOpen(false);
        } else {
          toast(message('초대에 실패하였습니다.'), { type: 'error' });
        }
      },
      onError: () => {
        toast.error('서버와 연결이 되어있지 않습니다.');
      },
    }
  );

  const onSubmitEmail = useCallback(
    (e: any) => {
      e.preventDefault();
      inviteMemberMutation.mutate({ invitedMemberEmails: emails });
    },
    [emails, inviteMemberMutation]
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - memberList.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //멤버 정보 수정 시 멤버 정보 제대로 수정되지않는 버그 발견

  return (
    <>
      {isVisible && !isLoading && projectData && projectData.projectMembers ? (
        <Wrapper>
          <ProjectSection>
            <ProjectHeader>
              <div>프로젝트 정보</div>
              <div>
                <Button size="large" onClick={() => SetProjectModalOpen(true)}>
                  프로젝트 정보 수정
                </Button>
              </div>
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
          </ProjectSection>
          <Divider />
          <MemberSection>
            <MemberHeader>
              <MemberHeaderLeft>구성원 관리</MemberHeaderLeft>
              <MemberHeaderRight>
                <Button
                  type="primary"
                  size="large"
                  style={{ color: 'black', backgroundColor: 'white', border: '1px' }}
                  onClick={() => SetInvitationModalOpen(true)}
                >
                  멤버 추가
                </Button>
                <Button type="primary" style={{ color: 'white' }} size={'large'} onClick={modifyMember}>
                  멤버 권한 저장
                </Button>
              </MemberHeaderRight>
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
                    ).map((memberList, i) => (
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
                          <Select
                            labelInValue
                            defaultValue={{
                              value: memberList.position,
                              label: memberList.position?.label,
                            }}
                            style={{ width: 150, marginRight: 10 }}
                            onChange={value => handleChange(value, i)}
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
            <Button
              key="submit"
              onClick={() => {
                deleteProject();
              }}
            >
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
                <Button key="submit" style={{ width: '5rem' }} onClick={editProject}>
                  변경하기
                </Button>
              </div>
            }
          >
            <TextArea
              value={title}
              autoSize={{ minRows: 1, maxRows: 10 }}
              onChange={e => setTitle(e.target.value)}
              placeholder={projectData?.projectTitle}
              style={{ marginBottom: '2rem', marginTop: '3rem' }}
            />

            <TextArea
              value={content}
              autoSize={{ minRows: 3, maxRows: 10 }}
              onChange={e => setContent(e.target.value)}
              placeholder={projectData?.projectContent}
              style={{ marginBottom: '2rem' }}
            />
          </Modal>
        </Wrapper>
      ) : (
        <Wrapper>
          <ActivityIndicator />
        </Wrapper>
      )}
    </>
  );
};

export default ManageMember;
