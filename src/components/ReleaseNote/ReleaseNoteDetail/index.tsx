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
  ReleasedNoteText,
  ReleasedNoteTitle,
} from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import MDEditor from '@uiw/react-md-editor';
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
            if (note.key === Id.releaseId) {
              return (
                <Typography key={index}>
                  <ReleasedNoteParagraph>
                    <ReleasedNoteText>Version {note.key}</ReleasedNoteText>
                    <ReleasedNoteTitle level={3}>{note.title}</ReleasedNoteTitle>
                    <MDEditor.Markdown source={note.contents} />
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
