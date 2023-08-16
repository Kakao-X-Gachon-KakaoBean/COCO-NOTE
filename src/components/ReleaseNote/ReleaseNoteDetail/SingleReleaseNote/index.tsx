import React, { useState } from 'react';
import { Typography } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import ConvertDate from '@/components/ReleaseNote/ConvertDate';
import {
  MarkdownParagraph,
  ReleasedNoteDate,
  ReleasedNoteParagraph,
  ReleasedNoteText,
  ReleasedNoteTitle,
} from '@/components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import {
  ReleaseNoteHeaderBottom,
  ReleaseNoteHeaderDiv,
  ReleaseNoteHeaderMiddle,
  ReleaseNoteHeaderTop,
} from '@/components/ReleaseNote/ReleaseNoteDetail/styles.tsx';
import { useRecoilValueLoadable } from 'recoil';
import { projectInfoMenuOpenState } from '@/states/ProjectState.ts';
import { ActivityIndicator } from '@/components/ActivityIndicator';
import HeaderBar from '@/components/HeaderBar';
import SideBar from '@/components/SideBar';
import SideDetailBar from '@/components/SideDetailBar';
import { Wrapper } from '@/styles/DetailSide/styles.tsx';
import { SingleReleasedNote } from '@/components/ReleaseNote/ReleaseNoteDetail/SingleReleaseNote/type.ts';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import fetcher from '@/utils/fetcher.ts';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '@/Api';

const SingleReleaseNote: React.FC = () => {
  const projectInfoMenuOpen = useRecoilValueLoadable(projectInfoMenuOpenState);
  const headerParam = useParams();
  const scriptId = headerParam.releaseId;
  const [releaseNoteData, setReleaseNoteData] = useState<SingleReleasedNote>();

  useQuery<SingleReleasedNote>(
    ['releasenote', scriptId],
    () =>
      fetcher({
        queryKey: `${BACKEND_URL}/release-notes/${scriptId}`,
      }),
    {
      onSuccess: data => {
        setReleaseNoteData(data);
      },
      onError: () => {
        toast.error('오류가 발생했습니다. 화면을 새로고침 해주세요.');
      },
    }
  );
  let contents = null;
  switch (projectInfoMenuOpen.state) {
    case 'hasValue':
      contents = () => {
        if (projectInfoMenuOpen.contents) {
          return (
            <>
              <Typography>
                <ReleasedNoteParagraph>
                  <ReleaseNoteHeaderDiv>
                    <ReleaseNoteHeaderTop>
                      <ReleasedNoteTitle>{releaseNoteData?.releaseNoteTitle ?? 'none'}</ReleasedNoteTitle>
                    </ReleaseNoteHeaderTop>
                    <ReleaseNoteHeaderMiddle>
                      <ReleasedNoteText>{'Version ' + releaseNoteData?.releaseNoteVersion}</ReleasedNoteText>
                    </ReleaseNoteHeaderMiddle>
                    <ReleaseNoteHeaderBottom>
                      <ReleasedNoteDate>{ConvertDate(releaseNoteData?.createdAt ?? '')}</ReleasedNoteDate>
                    </ReleaseNoteHeaderBottom>
                  </ReleaseNoteHeaderDiv>
                  <MarkdownParagraph data-color-mode="light">
                    <MDEditor.Markdown
                      source={releaseNoteData?.releaseNoteContent}
                      style={{ fontFamily: 'SCDream4' }}
                    />
                  </MarkdownParagraph>
                </ReleasedNoteParagraph>
              </Typography>
            </>
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
