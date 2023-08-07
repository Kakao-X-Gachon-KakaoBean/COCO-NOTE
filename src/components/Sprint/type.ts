interface Worker {
  workerId: number;
  workerName: string;
  //아래 값은 나중에 이미지로 보여줘야함.
  workerThumbnailImg: string;
}

export interface ChildType {
  taskId: React.Key;
  sprintTitle: string;
  taskDesc: string;
  workStatus: string;
  worker: Worker;
}

export interface TableData {
  taskId?: any;
  key: string;
  sprintId: React.Key;
  sprintTitle: string;
  sprintDesc: string;
  startDate: string;
  dueDate: string;
  startMonth: string;
  dueMonth: string;
  children?: ChildType[];
}
