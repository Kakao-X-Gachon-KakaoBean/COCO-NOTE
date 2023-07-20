import { TestReleasedNote } from '@components/ReleaseNote/ReleasedNoteAll/mock.tsx';
import { useParams } from 'react-router';
import SideDetailBar from '@components/SideDetailBar';
import SideBar from '@components/SideBar';
import HeaderBar from '@components/HeaderBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { Button, Typography } from 'antd';
import {
  ReleasedNoteDiv,
  ReleasedNoteParagraph,
  ReleasedNoteDate,
  ReleasedNoteTitle,
  MarkdownParagraph,
  ReleasedNoteText,
} from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import MDEditor from '@uiw/react-md-editor';
import ConvertDate from '@components/ReleaseNote/ConvertDate';
import { useNavigate } from 'react-router-dom';

const ReleaseNoteDetail = () => {
  const Id = useParams();
  const navigate = useNavigate();
  const editReleaseNote = () => {
    navigate('edit');
  };
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ReleasedNoteDiv>
          {TestReleasedNote.map((note, index) => {
            if (note.version === Id.releaseId) {
              return (
                <Typography key={index}>
                  <ReleasedNoteParagraph>
                    <ReleasedNoteTitle>{note.title}</ReleasedNoteTitle>
                    <br />
                    <ReleasedNoteText>{'Version ' + note.version}</ReleasedNoteText>
                    <br />
                    <ReleasedNoteDate>{ConvertDate(note.date)}</ReleasedNoteDate>
                    <MarkdownParagraph>
                      <MDEditor.Markdown source={note.contents} style={{ fontFamily: 'SCDream4' }} />
                    </MarkdownParagraph>
                    {note.editState ? (
                      <Button type={'primary'} onClick={() => editReleaseNote()}>
                        수정하기
                      </Button>
                    ) : (
                      <></>
                    )}
                  </ReleasedNoteParagraph>
                </Typography>
              );
            }
          })}
        </ReleasedNoteDiv>
      </Wrapper>
    </>
  );
};

export default ReleaseNoteDetail;
