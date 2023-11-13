import { FooterDiv, LogoImg, RowDiv, TextRowDiv, Wrapper } from '@/pages/SmallScreenPage/styles.tsx';
import { Typography } from 'antd';
const { Paragraph, Text, Link, Title } = Typography;
import logoImage from '@/images/logoImage.png';

const SmallScreenPage = () => {
  return (
    <Wrapper>
      <RowDiv>
        <Typography>
          <RowDiv>
            <Title level={2}>화면의 크기가 너무 작습니다!</Title>
          </RowDiv>
          <TextRowDiv>
            <Text type="success">코코노트</Text>
            <Text>를 사용하는 데에 있어서 브라우저 혹은 화면 자체의 크기가 너무 작습니다.</Text>
          </TextRowDiv>
          <TextRowDiv>
            <Text type="success">넓이 800px 이상, 높이 700px 이상의 환경에서 이용해 주시기를 바랍니다.</Text>
          </TextRowDiv>
        </Typography>
      </RowDiv>
      <RowDiv>
        <LogoImg src={logoImage} />
      </RowDiv>
      <FooterDiv>
        <Link type="secondary" href="https://github.com/Kakao-X-Gachon-KakaoBean/COCO-NOTE">
          @ COCONOTE
        </Link>
        <Link type="secondary" href="https://github.com/Kakao-X-Gachon-KakaoBean">
          카카오 빈
        </Link>
      </FooterDiv>
    </Wrapper>
  );
};

export default SmallScreenPage;
