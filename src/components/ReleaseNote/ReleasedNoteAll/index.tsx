import React from 'react';
import { TestReleasedNote } from '@components/ReleaseNote/ReleasedNoteAll/mock.tsx';
import { Divider, Typography } from 'antd';
import {
  ReleasedNoteDiv,
  ReleasedNoteParagraph,
  ReleasedNoteText,
  ReleasedNoteTitle,
} from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import MDEditor from '@uiw/react-md-editor';
const ReleasedNoteAll: React.FC = () => {
  return (
    <ReleasedNoteDiv>
      <ReleasedNoteTitle level={2}>릴리즈 노트</ReleasedNoteTitle>
      <ReleasedNoteParagraph>
        이 페이지는 '프로젝트 이름' 릴리즈의 새로운 기능, 개선 사항, 알려진 문제 및 버그 수정에 대한 정보가 포함되어
        있습니다.
      </ReleasedNoteParagraph>
      <Divider />
      {TestReleasedNote.map((note, index) => (
        <Typography key={note.key}>
          <ReleasedNoteParagraph>
            <ReleasedNoteText strong>{note.title}</ReleasedNoteText>
            <MDEditor.Markdown source={note.contents} />
          </ReleasedNoteParagraph>
        </Typography>
      ))}
    </ReleasedNoteDiv>
  );
};
export default ReleasedNoteAll;
