describe('메인 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/main`);
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
      cy.get('[data-color-mode="light"] > .css-1gm1w8n').should('be.visible');
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
      cy.get('.ant-typography-secondary').should('have.text', 'KimAnyDog@test.com');
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

  context('메인페이지', () => {
    it('메인페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.wmde-markdown').should('be.visible');
      cy.get('#코코노트-기능-사용-설명서').should('have.text', '코코노트 기능 사용 설명서');
      cy.get('#내-정보').should('have.text', '내 정보');
      cy.get('#프로젝트-관리').should('have.text', '프로젝트 관리');
      cy.get('#릴리즈-노트').should('have.text', '릴리즈 노트');
      cy.get('#작업관리-항목').should('have.text', '작업관리 항목');
      cy.get('#이슈').should('have.text', '이슈');
      cy.get('#알림').should('have.text', '알림');
    });
  });
});
