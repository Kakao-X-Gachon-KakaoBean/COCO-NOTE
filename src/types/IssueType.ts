export interface CreateIssue {
  title: string;
  content: string | undefined;
  projectId: string | undefined;
}

export interface EditIssue {
  title: string;
  content: string | undefined;
}

export interface EditComment {
  content: string;
}

export interface CreateComment {
  content: string;
  issueId: string | undefined;
}

export interface IssueArray {
  id: number;
  title: string;
  writerId: number;
  writerName: string;
  writtenTime: string;
}

export interface IssueList {
  finalPage: boolean;
  issues: IssueArray[];
}

export interface IssueDataType {
  key: number;
  issue: string;
  version: number;
  name: string;
}

export interface Issue {
  issueId: number;
  title: string;
  content: string;
  writtenTime: string;
  writerName: string;
  thumbnailImg: string;
}

export interface Comment {
  commentId: number;
  content: string;
  writtenTime: string;
  writerName: string;
  thumbnailImg: string;
}

export interface GetIssueDetail {
  issue: Issue;
  comments: Comment[];
}
