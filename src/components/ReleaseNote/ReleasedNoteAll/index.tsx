import React from 'react';
import { TestReleasedNote } from '@components/ReleaseNote/ReleasedNoteAll/mock.tsx';
import { Divider, Typography } from 'antd';
import { ReleasedNoteDiv } from '@components/ReleaseNote/ReleasedNoteAll/styles.tsx';
const { Title, Paragraph, Text } = Typography;
const ReleasedNoteAll: React.FC = () => {
  return (
    <ReleasedNoteDiv>
      <Title level={2}>릴리즈 노트</Title>
      <Divider />
      {TestReleasedNote.map((note, index) => (
        <Typography key={note.key}>
          <Paragraph>
            <Text strong>{note.title}</Text>
            <p>{note.contents}</p>
          </Paragraph>
        </Typography>
      ))}
    </ReleasedNoteDiv>
  );
};
export default ReleasedNoteAll;
