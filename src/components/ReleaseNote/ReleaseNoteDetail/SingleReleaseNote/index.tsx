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
import { useRecoilValueLoadable } from 'recoil';
import { projectInfoMenuOpenState } from '@states/ProjectState.ts';
import { ActivityIndicator } from '@components/ActivityIndicator';
import HeaderBar from '@components/HeaderBar';
import SideBar from '@components/SideBar';
import SideDetailBar from '@components/SideDetailBar';
import { Wrapper } from '@styles/DetailSide/styles.tsx';

const SingleReleaseNote: React.FC = () => {
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);

  let contents = null;
  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <div>
              <Typography>
                <ReleasedNoteParagraph>
                  <ReleaseNoteHeaderDiv>
                    <ReleaseNoteHeaderTop>
                      {/*<ReleasedNoteTitle>{note.title}</ReleasedNoteTitle>*/}
                    </ReleaseNoteHeaderTop>
                    <ReleaseNoteHeaderMiddle>
                      {/*<ReleasedNoteText>{'Version ' + note.version}</ReleasedNoteText>*/}
                    </ReleaseNoteHeaderMiddle>
                    <ReleaseNoteHeaderBottom>
                      {/*<ReleasedNoteDate>{ConvertDate(note.date)}</ReleasedNoteDate>*/}
                    </ReleaseNoteHeaderBottom>
                  </ReleaseNoteHeaderDiv>
                  <MarkdownParagraph data-color-mode="light">
                    {/*<MDEditor.Markdown source={note.contents} style={{ fontFamily: 'SCDream4' }} />*/}
                  </MarkdownParagraph>
                </ReleasedNoteParagraph>
              </Typography>
            </div>
          );
        } else {
          return <ActivityIndicator />;
        }
      };
      break;
    case 'hasError':
      contents = () => {
        return <div>데이터를 서버에서 불러올 수 없습니다.</div>;
      };
      break;
    case 'loading':
      contents = () => {
        return <ActivityIndicator />;
      };
      break;
    default:
      contents = () => {
        return <div>에러가 발생했습니다. 페이지를 새로고침해주세요.</div>;
      };
  }
  return (
    <>
      <HeaderBar />
      <SideBar />
      <SideDetailBar />
      <Wrapper>{contents()}</Wrapper>
    </>
  );
};

export default SingleReleaseNote;
