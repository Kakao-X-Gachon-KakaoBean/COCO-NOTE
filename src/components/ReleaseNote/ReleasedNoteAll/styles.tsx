import styled from '@emotion/styled';
import { Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;
export const ReleasedNoteDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2% 5% 5% 4%;
`;

export const ReleasedNoteParagraph = styled(Paragraph)`
  font-family: SCDream4;
`;

export const MarkdownParagraph = styled(Paragraph)`
  margin-top: 2%;
  font-family: SCDream4;
`;

export const ReleasedNoteTitle = styled(Title)`
  font-family: SCDream5;
`;

export const ReleasedNoteDate = styled(Text)`
  font-family: SCDream4;
  color: #afabab;
`;
