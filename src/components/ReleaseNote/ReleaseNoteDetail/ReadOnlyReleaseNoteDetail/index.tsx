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
import {
  ReleaseNoteHeaderBottom,
  ReleaseNoteHeaderDiv,
  ReleaseNoteHeaderMiddle,
  ReleaseNoteHeaderTop,
} from '@components/ReleaseNote/ReleaseNoteDetail/styles.tsx';
import { ReleasedNoteAll } from '@components/ReleaseNote/ReleasedNoteAll/type.ts';

interface Props {
  note: ReleasedNoteAll;
}
const ReadOnlyReleaseNoteDetail: React.FC<Props> = ({ note }) => {
  return (
    <Typography>
      <ReleasedNoteParagraph>
        <ReleaseNoteHeaderDiv>
          <ReleaseNoteHeaderTop>
            <ReleasedNoteTitle>{note.title}</ReleasedNoteTitle>
          </ReleaseNoteHeaderTop>
          <ReleaseNoteHeaderMiddle>
            <ReleasedNoteText>{'Version ' + note.version}</ReleasedNoteText>
          </ReleaseNoteHeaderMiddle>
          <ReleaseNoteHeaderBottom>
            <ReleasedNoteDate>{ConvertDate(note.date)}</ReleasedNoteDate>
          </ReleaseNoteHeaderBottom>
        </ReleaseNoteHeaderDiv>
        <MarkdownParagraph data-color-mode="light">
          <MDEditor.Markdown source={note.contents} style={{ fontFamily: 'SCDream4' }} />
        </MarkdownParagraph>
      </ReleasedNoteParagraph>
    </Typography>
  );
};

export default ReadOnlyReleaseNoteDetail;
