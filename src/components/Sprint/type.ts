interface Member {
  workerId: number;
  workerName: string;
  //이미지는 나중에 이미지로 바꿔야합니다.
  workerProfile: string;
}

interface ChildType {
  taskId: React.Key;
  sprintTitle: string;
  taskDesc: string;
  status: string;
  worker: Member;
}

export interface TableData {
  key: string;
  sprintId: React.Key;
  sprintTitle: string;
  sprintDesc: string;
  startDate: string;
  dueDate: string;
  children?: ChildType[];
}
