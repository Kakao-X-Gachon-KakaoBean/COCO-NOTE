interface Worker {
  workerId: number;
  workerName: string;
  //아래 값은 나중에 이미지로 보여줘야함.
  workerThumbnailImg: string;
}

export interface ChildType {
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
