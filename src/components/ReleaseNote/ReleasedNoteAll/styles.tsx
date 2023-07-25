import styled from '@emotion/styled';
import { Typography } from 'antd';
const { Paragraph, Text } = Typography;
export const ReleasedNoteDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2% 15% 5% 10%;
`;

export const ReleasedNoteParagraph = styled(Paragraph)`
  font-family: SCDream4;
`;

export const MarkdownParagraph = styled(Paragraph)`
  margin-top: 3%;
  font-family: SCDream4;
`;

export const ReleaseNoteTotalText = styled(Text)`
  font-family: SCDream6;
  font-size: 1.8vw;
`;
export const ReleaseNoteTotalDetail = styled(Text)`
  font-family: SCDream4;
  font-size: 1.1vw;
`;
export const ReleasedNoteTitle = styled(Text)`
  font-family: SCDream5;
  font-size: 1.5vw;
`;

export const ReleasedNoteText = styled(Text)`
  font-family: SCDream5;
  font-size: 1vw;
`;

export const ReleasedNoteDate = styled(Text)`
  font-family: SCDream4;
  color: #afabab;
  font-size: 0.8vw;
`;
