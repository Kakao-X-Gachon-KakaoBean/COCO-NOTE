import { TestReleasedNote } from '@components/ReleaseNote/ReleasedNoteAll/mock.tsx';
import { useParams } from 'react-router';
import SideDetailBar from '@components/SideDetailBar';
import SideBar from '@components/SideBar';
import HeaderBar from '@components/HeaderBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';
import { Typography } from 'antd';
import {
  ReleasedNoteDiv,
  ReleasedNoteParagraph,
  ReleasedNoteText,
  ReleasedNoteTitle,
} from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import ReleaseNoteEdit from '@components/ReleaseNote/ReleaseNoteEdit';
import MDEditor from '@uiw/react-md-editor';

const ReleaseNoteDetail = () => {
  const Id = useParams();
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>
        <ReleasedNoteDiv>
          {TestReleasedNote.map((note, index) => {
            if (note.key === Id.releaseId) {
              if (note.editState) {
                return <ReleaseNoteEdit key={index} />;
              } else {
                return (
                  <Typography key={index}>
                    <ReleasedNoteParagraph>
                      <ReleasedNoteText>Version {note.key}</ReleasedNoteText>
                      <ReleasedNoteTitle level={3}>{note.title}</ReleasedNoteTitle>
                      <MDEditor.Markdown source={note.contents} />
                    </ReleasedNoteParagraph>
                  </Typography>
                );
              }
            }
          })}
        </ReleasedNoteDiv>
      </Wrapper>
    </>
  );
};

export default ReleaseNoteDetail;
