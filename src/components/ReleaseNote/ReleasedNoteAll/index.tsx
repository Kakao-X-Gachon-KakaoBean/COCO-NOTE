import React, { useEffect } from 'react';
import { Divider, Typography } from 'antd';
import {
  MarkdownParagraph,
  ReleasedNoteDate,
  ReleasedNoteDiv,
  ReleasedNoteParagraph,
  ReleasedNoteText,
  ReleasedNoteTitle,
  ReleaseNoteTotalDetail,
  ReleaseNoteTotalText,
} from '@/components/ReleaseNote/ReleasedNoteAll/styles.tsx';
import MDEditor from '@uiw/react-md-editor';
import ConvertDate from '@/components/ReleaseNote/ConvertDate';
import { ReleaseNoteHeaderDiv } from '@/components/ReleaseNote/ReleaseNoteDetail/styles.tsx';
import { useParams } from 'react-router';
import { PagedReleaseNotes } from '@/components/ReleaseNote/ReleasedNoteAll/type.ts';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { ActivityIndicator } from '@/components/ActivityIndicator';
import pagedFetcher from '@/utils/pagedFetcher.ts';
import { BACKEND_URL } from '@/Api';

const ReleasedNoteAll: React.FC = () => {
  const headerParam = useParams();
  const projectId = headerParam.projectId;

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery<PagedReleaseNotes>(
    ['pagedReleaseNotes'],
    ({ pageParam = 0 }) =>
      pagedFetcher({ queryKey: [`${BACKEND_URL}/release-notes/page?projectId=${projectId}`, pageParam] }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.finalPage) {
          return undefined;
        }
        return pages.length + 1;
      },
    }
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage().catch(error => {
        console.error(error);
      });
    }
  }, [inView, hasNextPage, isLoading, fetchNextPage]);

  return (
    <ReleasedNoteDiv>
      <ReleaseNoteTotalText>릴리즈 노트</ReleaseNoteTotalText>
      <ReleasedNoteParagraph>
        <ReleaseNoteTotalDetail>
          이 페이지는 <strong>&apos;프로젝트 이름&apos;</strong> 프로젝트의 <br />
          새로운 기능, 개선 사항, 알려진 문제 및 버그 수정에 대한 정보가 포함되어 있습니다.
        </ReleaseNoteTotalDetail>
      </ReleasedNoteParagraph>
      <Divider />
      <Typography>
        <ReleasedNoteParagraph>
          {isLoading && data ? (
            <ActivityIndicator />
          ) : (
            <>
              {data?.pages
                .flatMap(page => page.releaseNotes)
                .map(note => (
                  <div key={note.id}>
                    <ReleaseNoteHeaderDiv>
                      <ReleasedNoteTitle>{note.title}</ReleasedNoteTitle>
                      <ReleasedNoteDate>{ConvertDate(note.createdAt)}</ReleasedNoteDate>
                    </ReleaseNoteHeaderDiv>
                    <MarkdownParagraph data-color-mode="light">
                      <MDEditor.Markdown source={note.content} style={{ fontFamily: 'SCDream4' }} />
                      <Divider />
                    </MarkdownParagraph>
                  </div>
                ))}
              {isFetchingNextPage ? <ActivityIndicator /> : hasNextPage && <div ref={ref}></div>}
            </>
          )}
        </ReleasedNoteParagraph>
      </Typography>
    </ReleasedNoteDiv>
  );
};
export default ReleasedNoteAll;
