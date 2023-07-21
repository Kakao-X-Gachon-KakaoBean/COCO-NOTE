import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Typography, Button } from 'antd';
import {
  BulletinDiv,
  EditingText,
  ReleaseNoteHeaderBottom,
  ReleaseNoteHeaderDiv,
  ReleaseNoteHeaderMiddle,
  ReleaseNoteHeaderTop,
  ReleaseNoteHeaderTopLeft,
  ReleaseNoteHeaderTopRight,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

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
            <ReleaseNoteHeaderTopLeft>
              <ReleasedNoteTitle>{note.title}</ReleasedNoteTitle>
              <EditingText>
                <FontAwesomeIcon icon={faCircle} size={'xs'} />
                &nbsp;현재 작성 중입니다
              </EditingText>
            </ReleaseNoteHeaderTopLeft>
            <ReleaseNoteHeaderTopRight>
              <Button danger>삭제</Button>
              <Button onClick={() => editReleaseNote()}>수정하기</Button>
            </ReleaseNoteHeaderTopRight>
          </ReleaseNoteHeaderTop>
          <ReleaseNoteHeaderMiddle>
            <ReleasedNoteText>{'Version ' + note.version}</ReleasedNoteText>
          </ReleaseNoteHeaderMiddle>
          <ReleaseNoteHeaderBottom>
            <ReleasedNoteDate>{ConvertDate(note.date)}</ReleasedNoteDate>
          </ReleaseNoteHeaderBottom>
        </ReleaseNoteHeaderDiv>
        <MarkdownParagraph>
          <BulletinDiv>
            <MDEditor.Markdown source={note.contents} style={{ fontFamily: 'SCDream4' }} />
          </BulletinDiv>
        </MarkdownParagraph>
      </ReleasedNoteParagraph>
    </Typography>
  );
};

export default BulletinReleaseNoteDetail;
