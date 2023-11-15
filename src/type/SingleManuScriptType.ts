export interface SingleManuscriptInfo {
  lastEditedMemberName: string;
  manuscriptId: number;
  manuscriptTitle: string;
  manuscriptContent: string;
  manuscriptVersion: string;
  createdAt: string;
  manuscriptStatus: string;
}
export interface DistributeManuscript {
  title: string;
  content: string;
  version: string;
  projectId: string;
}
