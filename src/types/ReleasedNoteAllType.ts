export interface ReleasedNoteAll {
  version: string | number;
  title: string;
  date: string;
  contents: string | undefined;
  editState: boolean;
}
export interface ReleaseNote {
  id: number;
  title: string;
  version: string;
  content: string;
}

export interface PagedReleaseNotes {
  finalPage: boolean;
  releaseNotes: ReleaseNote[];
}
