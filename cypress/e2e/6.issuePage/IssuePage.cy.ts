describe('이슈 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '/issues/page?projectId=5&page=0', {
      fixture: 'issueFirstContents.json',
    }).as('issueFirstContents');
    cy.intercept('GET', '/issues/page?projectId=5&page=1', {
      fixture: 'issueLastContents.json',
    }).as('issueLastContents');
    cy.visit(`/projects/5/issues`);
  });

  context('이슈 페이지에 들어온 경우', () => {
    it('사이드 바에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.selected').should('be.visible');
      cy.get('.selected > .css-1a1tdkp').should('have.text', 'Awesome project');
      cy.get(':nth-child(2) > .notSelected > .css-1a1tdkp').should('have.text', 'kakaoBean Project');
      cy.get('.css-gkszvj > .css-1a1tdkp').should('have.text', '+');
    });

    it('세부 사이드 바에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.selected > .css-1a1tdkp').should('have.text', 'Awesome project');
      cy.get(':nth-child(2) > .css-1eid011 > .css-1m0b3tt').should('have.text', '릴리즈 노트');
      cy.get(':nth-child(3) > .css-1eid011 > .css-1m0b3tt').should('have.text', '작업 관리');
      cy.get(':nth-child(4) > .css-1eid011 > .css-1m0b3tt').should('have.text', '이슈');
    });

    it('이슈 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('[disabled=""]').should('be.visible');
      cy.get('.css-n6k8c8 > :nth-child(3)').should('be.visible');
      cy.get('.css-172apq8').should('have.text', '이슈');
      cy.get('.ant-btn > span').should('have.text', '새 이슈 생성');
    });

    it('이슈가 존재하면 이슈 리스트에 회면에 보여야 한다.', () => {
      cy.get('.css-n6k8c8 > span').should('be.visible');
      cy.get('.css-n6k8c8 > span').should('have.text', 'Page 0');
      cy.get('[data-row-key="1"] > :nth-child(2)').should('have.text', '1번 이슈');
      cy.get('[data-row-key="8"] > :nth-child(2)').should('have.text', '8번 이슈');
    });

    it('이슈가 2페이지 이상일 경우 오른쪽 버튼을 누르면 다음 이슈 리스트가 화면에 보여야 한다.', () => {
      cy.get('.css-n6k8c8 > :nth-child(3)').click();
      cy.get('.css-n6k8c8 > span').should('be.visible');
      cy.get('.css-n6k8c8 > span').should('have.text', 'Page 1');
      cy.get('[data-row-key="9"] > :nth-child(2)').should('have.text', '9번 이슈');
    });

    it('새 이슈 생성 버튼을 누르면 이슈 생성 페이지로 넘어가야 한다.', () => {
      cy.get('.ant-btn > span').click();
      cy.url().should('include', '/createIssue');
      cy.get(':nth-child(4) > .css-1eid011 > .css-x8q2xp').click();
      cy.url().should('include', '/issues');
    });
  });
});

// cy.get(':nth-child(1) > .ant-btn').should('have.text', '뒤로 가기');
