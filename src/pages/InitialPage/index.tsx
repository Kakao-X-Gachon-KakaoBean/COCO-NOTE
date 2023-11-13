import { BtnLink, ExplainDiv, LoginBtn, MainSection, ProjectNameDiv, Wrapper } from '@/pages/InitialPage/styles.tsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const InitialPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Wrapper>
      <MainSection>
        <ProjectNameDiv data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
          COCONOTE
        </ProjectNameDiv>
        <ExplainDiv data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
          프로젝트의 성장을 <br />
          효과적으로 공유하세요
        </ExplainDiv>
        <BtnLink to="/login">
          <LoginBtn data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
            로그인하여 시작하기
          </LoginBtn>
        </BtnLink>
      </MainSection>
    </Wrapper>
  );
};

export default InitialPage;
