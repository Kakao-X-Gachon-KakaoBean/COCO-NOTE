import React from 'react';
import { Typography } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import ConvertDate from '@components/ReleaseNote/ConvertDate';
import {
  ReleasedNoteParagraph,
  ReleasedNoteTitle,
  MarkdownParagraph,
  ReleasedNoteText,
  ReleasedNoteDate,
} from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import { ReleaseNoteHeaderDiv } from '@components/ReleaseNote/ReleaseNoteDetail/styles.tsx';
import { ReleasedNoteAll } from '@components/ReleaseNote/ReleasedNoteAll/type.ts';

interface Props {
  note: ReleasedNoteAll;
}
const ReadOnlyReleaseNoteDetail: React.FC<Props> = ({ note }) => {
  return (
    <Typography>
      <ReleasedNoteParagraph>
        <ReleaseNoteHeaderDiv>
          <ReleasedNoteTitle>{note.title}</ReleasedNoteTitle>
          <ReleasedNoteText>{'Version ' + note.version}</ReleasedNoteText>
          <ReleasedNoteDate>{ConvertDate(note.date)}</ReleasedNoteDate>
        </ReleaseNoteHeaderDiv>
        <MarkdownParagraph>
          <MDEditor.Markdown source={note.contents} style={{ fontFamily: 'SCDream4' }} />
        </MarkdownParagraph>
      </ReleasedNoteParagraph>
    </Typography>
  );
};

export default ReadOnlyReleaseNoteDetail;
