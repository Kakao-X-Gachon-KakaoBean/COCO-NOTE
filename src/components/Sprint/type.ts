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
