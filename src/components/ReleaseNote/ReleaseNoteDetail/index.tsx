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
import {
  BulletinDiv,
  EditButtonDiv,
  ReleaseNoteHeaderDiv,
  ReleaseNoteHeaderTop,
} from '@components/ReleaseNote/ReleaseNoteDetail/styles.tsx';

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
                    <ReleaseNoteHeaderDiv>
                      <ReleaseNoteHeaderTop>
                        <ReleasedNoteTitle>{note.title}</ReleasedNoteTitle>
                        {note.editState ? <Button danger>삭제</Button> : <></>}
                      </ReleaseNoteHeaderTop>
                      <ReleasedNoteText>{'Version ' + note.version}</ReleasedNoteText>
                      <ReleasedNoteDate>{ConvertDate(note.date)}</ReleasedNoteDate>
                    </ReleaseNoteHeaderDiv>
                    {note.editState ? (
                      <MarkdownParagraph>
                        <div>작성 중입니다.</div>
                        <BulletinDiv>
                          <MDEditor.Markdown source={note.contents} style={{ fontFamily: 'SCDream4' }} />
                        </BulletinDiv>
                      </MarkdownParagraph>
                    ) : (
                      <MarkdownParagraph>
                        <MDEditor.Markdown source={note.contents} style={{ fontFamily: 'SCDream4' }} />
                      </MarkdownParagraph>
                    )}
                    {note.editState ? (
                      <EditButtonDiv>
                        <Button type={'primary'} onClick={() => editReleaseNote()}>
                          수정하기
                        </Button>
                      </EditButtonDiv>
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
