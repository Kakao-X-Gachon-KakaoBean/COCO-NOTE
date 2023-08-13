export interface SimpleManuscript {
  id: number;
  title: string;
  version: string;
}
export interface ManuscriptTree {
  manuscripts: SimpleManuscript[];
}
export interface SimpleReleasedNote {
  id: number;
  title: string;
  version: string;
}
export interface ReleasedNoteTree {
  releaseNotes: SimpleReleasedNote[];
}
