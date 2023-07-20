import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Typography, Button } from 'antd';
import {
  BulletinDiv,
  EditButtonDiv,
  ReleaseNoteHeaderDiv,
  ReleaseNoteHeaderTop,
} from '@components/ReleaseNote/ReleaseNoteDetail/styles.tsx';
import {
  MarkdownParagraph,
  ReleasedNoteDate,
  ReleasedNoteParagraph,
  ReleasedNoteText,
  ReleasedNoteTitle,
} from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import ConvertDate from '@components/ReleaseNote/ConvertDate';
import { useNavigate } from 'react-router-dom';
import { ReleasedNoteAll } from '@components/ReleaseNote/ReleasedNoteAll/type.ts';

interface Props {
  note: ReleasedNoteAll;
}
const BulletinReleaseNoteDetail: React.FC<Props> = ({ note }) => {
  const navigate = useNavigate();
  const editReleaseNote = () => {
    navigate('edit');
  };

  return (
    <Typography>
      <ReleasedNoteParagraph>
        <ReleaseNoteHeaderDiv>
          <ReleaseNoteHeaderTop>
            <ReleasedNoteTitle>{note.title}</ReleasedNoteTitle>
            <Button danger>삭제</Button>
          </ReleaseNoteHeaderTop>
          <ReleasedNoteText>{'Version ' + note.version}</ReleasedNoteText>
          <ReleasedNoteDate>{ConvertDate(note.date)}</ReleasedNoteDate>
        </ReleaseNoteHeaderDiv>
        <MarkdownParagraph>
          <div>작성 중입니다.</div>
          <BulletinDiv>
            <MDEditor.Markdown source={note.contents} style={{ fontFamily: 'SCDream4' }} />
          </BulletinDiv>
        </MarkdownParagraph>
        <EditButtonDiv>
          <Button type={'primary'} onClick={() => editReleaseNote()}>
            수정하기
          </Button>
        </EditButtonDiv>
      </ReleasedNoteParagraph>
    </Typography>
  );
};

export default BulletinReleaseNoteDetail;
