export interface CreateIssue {
  title: string;
  content: string | undefined;
  projectId: string | undefined;
}

export interface CreateComment {
  content: string;
  issueId: string | undefined;
}

export interface IssueArray {
  id: number;
  title: string;
  writerId: number;
  writtenTime: string;
}

export interface IssueList {
  finalPage: boolean;
  issues: IssueArray[];
}
