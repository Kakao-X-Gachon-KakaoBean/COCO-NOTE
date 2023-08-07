interface Worker {
  workerId: number;
  workerName: string;
  //아래 값은 나중에 이미지로 보여줘야함.
  workerThumbnailImg: string;
}

export interface ChildType {
  taskId: React.Key;
  taskTitle: string;
}

export interface TableData {
  taskId?: React.Key;
  key: string;
  sprintId: React.Key;
  sprintTitle: string;
  startDate: string;
  dueDate: string;
  children?: ChildType[];
}
