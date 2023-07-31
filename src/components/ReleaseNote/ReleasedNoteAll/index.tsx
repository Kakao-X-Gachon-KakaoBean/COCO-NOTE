import React from 'react';
import { TestReleasedNote } from '@components/ReleaseNote/ReleasedNoteAll/mock.tsx';
import { Divider, Typography } from 'antd';
import {
  ReleasedNoteDiv,
  ReleasedNoteParagraph,
  ReleasedNoteDate,
  ReleasedNoteTitle,
  MarkdownParagraph,
  ReleasedNoteText,
  ReleaseNoteTotalText,
  ReleaseNoteTotalDetail,
} from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import MDEditor from '@uiw/react-md-editor';
import ConvertDate from '@components/ReleaseNote/ConvertDate';
import { ReleaseNoteHeaderDiv } from '@components/ReleaseNote/ReleaseNoteDetail/styles.tsx';
const ReleasedNoteAll: React.FC = () => {
  return (
    <ReleasedNoteDiv>
      <ReleaseNoteTotalText>릴리즈 노트</ReleaseNoteTotalText>
      <ReleasedNoteParagraph>
        <ReleaseNoteTotalDetail>
          이 페이지는 &apos;프로젝트 이름&apos; 릴리즈의 <br />
          새로운 기능, 개선 사항, 알려진 문제 및 버그 수정에 대한 정보가 포함되어 있습니다.
        </ReleaseNoteTotalDetail>
      </ReleasedNoteParagraph>
      <Divider />
      {TestReleasedNote.map(note => (
        <Typography key={note.version}>
          <ReleasedNoteParagraph>
            <ReleaseNoteHeaderDiv>
              <ReleasedNoteTitle>{note.title}</ReleasedNoteTitle>
              <ReleasedNoteText>{'Version ' + note.version}</ReleasedNoteText>
              <ReleasedNoteDate>{ConvertDate(note.date)}</ReleasedNoteDate>
            </ReleaseNoteHeaderDiv>
            <MarkdownParagraph data-color-mode="light">
              <MDEditor.Markdown source={note.contents} style={{ fontFamily: 'SCDream4' }} />
              <Divider />
            </MarkdownParagraph>
          </ReleasedNoteParagraph>
        </Typography>
      ))}
    </ReleasedNoteDiv>
  );
};
export default ReleasedNoteAll;
