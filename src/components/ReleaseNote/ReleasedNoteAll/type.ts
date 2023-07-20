export interface ReleasedNoteAll {
  version: string | number;
  title: string;
  date: string;
  contents: string | undefined;
  editState: boolean;
}
