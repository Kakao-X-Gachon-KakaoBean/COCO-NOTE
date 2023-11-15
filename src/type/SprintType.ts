export interface ChildType {
  sprintId: number;
  taskId: number;
  taskTitle: string;
  taskDesc?: string;
  workStatus: string;
  workerName: string;
  workerThumbnailImg: string;
}

export interface TableData {
  taskId?: number;
  key: string;
  sprintId: number;
  sprintDesc?: string;
  sprintTitle: string;
  startDate: string;
  dueDate: string;
  children?: ChildType[];
}

export interface ProjectMember {
  projectMemberId: number;
  projectMemberName: string;
  projectMemberEmail: string;
  projectMemberRole: 'ADMIN' | 'MEMBER' | 'VIEWER' | 'INVITED_PERSON';
  memberThumbnailImg: string;
}

export interface WorkStatusType {
  workStatus: string;
  taskId: number;
}

export interface ChangeWorkerType {
  taskId: number;
  memberId: number;
}

export interface EditTaskDataType {
  taskTitle: string;
  taskDesc: string;
  sprintId: number;
}

export interface EditSprintDataType {
  sprintTitle: string;
  sprintDesc: string;
  startDate: string;
  dueDate: string;
}

export interface CreateSprintDataType {
  sprintTitle: string;
  sprintDesc: string;
  projectId: number;
  startDate: string;
  dueDate: string;
}

export interface CreateTaskDataType {
  taskTitle: string;
  taskDesc: string;
  sprintId: number;
}
