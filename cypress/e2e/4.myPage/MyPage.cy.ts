describe('마이 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/mypage`);
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '**/members/info', {
      fixture: 'memberInfo.json',
    }).as('MemberInfo');
    cy.intercept('GET', '**/notification', {
      fixture: 'notificationInfo.json',
    }).as('NotificationInfo');
  });

  context('메인페이지에 들어온 경우 .', () => {
    it('헤더바, 사이드바, 메인 부분이 있어야 한다.', () => {
      cy.get('.css-10t8sbs').should('be.visible');
      cy.get('.css-wvf9t0').should('be.visible');
      cy.get('.css-qpyp9c').should('be.visible');
    });
  });

  context('헤더바', () => {
    it('헤더바에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-1pyjakx').should('have.text', 'COCONOTE');
      cy.get('.css-bb44lz > :nth-child(1) > .ant-dropdown-trigger').should('be.visible');
      cy.get(':nth-child(2) > .ant-space > .ant-space-item').should('be.visible');
    });

    it('알림 아이콘을 눌렀을 때에는 하위 항목이 보여야 한다.', () => {
      cy.get('.css-bb44lz > :nth-child(1) > .ant-dropdown-trigger').click();
      cy.get('.ant-dropdown-menu').should('be.visible');
      // 알림 가져오는거  봐야함
    });

    it('내정보 아이콘을 눌렀을 때에는 하위 항목이 보여야 한다.', () => {
      cy.get(':nth-child(2) > .ant-space > .ant-space-item').click();
      cy.get('.ant-card').should('be.visible');
      cy.get('.ant-image-img').should('be.visible');
      cy.get('h4.ant-typography').should('have.text', '김아무개');
      cy.get('.css-1brhx6x > .ant-typography-secondary').should('have.text', 'KimAnyDog@test.com');
      cy.get('.ant-card-actions').should('be.visible');
    });
  });

  context('사이드바', () => {
    it('사이드바에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.selected').should('be.visible');
      cy.get(':nth-child(1) > .notSelected > .css-1a1tdkp').should('have.text', 'Awesome project');
      cy.get(':nth-child(2) > .notSelected > .css-1a1tdkp').should('have.text', 'kakaoBean Project');
      cy.get('.css-gkszvj > .css-1a1tdkp').should('have.text', '+');
    });

    it('+버튼을 눌렀을 때에는 프로젝트 생성 모달이 보여야 한다.', () => {
      cy.get('.css-gkszvj > .css-1a1tdkp').click();
      cy.get('.ant-modal-content').should('be.visible');
      cy.get('[placeholder="프로젝트 명"]').should('be.visible');
      cy.get('[placeholder="프로젝트 설명"]').should('be.visible');
      cy.get('.ant-modal-footer > .ant-btn').should('have.text', '전송');
    });
  });

  context('마이페이지', () => {
    it('마이페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-103kxqb > :nth-child(1)').should('have.text', '내 정보');
      cy.get('.css-1hsmx53').should('be.visible');
      cy.get('.css-ak39sn > .ant-btn').should('have.text', '프로필 변경');
      cy.get('[style=""] > div.ant-typography > .ant-typography-secondary').should('have.text', '이름');
      cy.get('strong').should('have.text', '김아무개');
      cy.get(':nth-child(2) > div.ant-typography > .ant-typography-secondary').should('have.text', '이메일');
      cy.get('[style="font-family: SCDream4;"]').should('have.text', 'KimAnyDog@test.com');
      cy.get('.css-103kxqb > :nth-child(4)').should('have.text', '비밀번호 변경');
      cy.get(':nth-child(5) > div > .ant-btn').should('have.text', '비밀번호 변경');
      cy.get('.css-103kxqb > :nth-child(7)').should('have.text', '계정 탈퇴');
      cy.get(':nth-child(8) > div > .ant-btn').should('have.text', '계정 탈퇴');
    });

    it('프로필 변경 버튼을 눌렀을때는 프로필 이미지 변경 모달이 표시되어야한다.', () => {
      cy.get('.css-ak39sn > .ant-btn').click();
      cy.get('.ant-modal-content').should('be.visible');
      cy.get('.ant-modal-body > :nth-child(1) > div').should('be.visible');
      cy.get('label').should('have.text', '클릭하여 이미지를 업로드하세요');
      cy.get('.ant-modal-footer > .ant-btn-default').should('have.text', 'Cancel');
      cy.get('.ant-modal-footer > .ant-btn-primary').should('have.text', 'OK');
    });

    it('비밀번호 변경 버튼을 눌렀을때는 비밀번호 변경 모달이 표시되어야한다.', () => {
      cy.get(':nth-child(5) > div > .ant-btn').click();
      cy.get('.css-1hcz36b').should('be.visible');
      cy.get('.css-iebaid').should('have.text', '비밀번호 변경');
      cy.get('#email').should('be.visible');
      cy.get('.css-15tq698').should('have.text', '이메일 인증');
      cy.get('#authKey').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#passwordCheck').should('be.visible');
      cy.get('.css-19yswo5').should('have.text', '비밀번호 변경');
    });

    it('이메일 인증 버튼을 눌렀을때는 이메일 인증 API가 보내져야한다.', () => {
      // 어떻게 짜는지 몰라서 아직 못짰어요.
    });

    it('계정 탈퇴 버튼을 눌렀을때는 비밀번호 변경 모달이 표시되어야한다.', () => {
      cy.get(':nth-child(8) > div > .ant-btn').click();
      cy.get('.ant-modal-content').should('be.visible');
      cy.get('.css-yt70es > :nth-child(1)').should('have.text', '정말 계정을 삭제하시겠습니까?');
      cy.get('.css-yt70es > :nth-child(2)').should('have.text', '코코노트의 모든 사용자 정보가 삭제됩니다.');
      cy.get('.css-12y85tp').should('have.text', '계정삭제에 동의합니다.');
      cy.get('.css-1mwn02k > .ant-btn').should('have.text', '확인');
    });

    it('계정삭제 버튼을 눌렀을때는 계정삭제 API가 보내져야한다.', () => {
      // 어떻게 짜는지 몰라서 아직 못짰어요.
    });
  });
});
