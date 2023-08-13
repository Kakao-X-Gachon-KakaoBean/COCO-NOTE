export interface ManuscriptEdit {
  manuscriptId: number;
  manuscriptTitle: string;
  manuscriptContent: string;
  manuscriptVersion: string;
}

export interface SaveEditedManuscript {
  manuscriptId: string;
  title: string;
  content: string;
  version: string;
}
