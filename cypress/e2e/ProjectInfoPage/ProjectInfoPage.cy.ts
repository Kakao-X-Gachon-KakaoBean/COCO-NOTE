describe('프로젝트 정보 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '**/members/info', {
      fixture: 'memberInfo.json',
    }).as('MemberInfo');
    cy.intercept('GET', '**/projects/5', {
      fixture: 'projectInfo.json',
    }).as('ProjectInfo');
    cy.visit(`http://localhost:3000/projects/5/projectinfo`);
  });

  context('프로젝트 정보 페이지에 들어온 경우 .', () => {
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

    it('프로젝트 정보 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-ewbcqp > div').should('have.text', '프로젝트 정보');
      cy.get('.css-12zyx3n > :nth-child(1) > :nth-child(1)').should('have.text', '프로젝트 이름');
      cy.get('.css-12zyx3n > :nth-child(2) > :nth-child(1)').should('have.text', '프로젝트 설명');
      cy.get('.css-1381m4y > .css-0').should('have.text', '구성원 관리');
      cy.get('.MuiTableCell-alignLeft').should('have.text', '이름');
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('have.text', '이메일');
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('have.text', '직위');
      cy.get('.MuiToolbar-root').should('be.visible');
    });

    it('프로젝트 정보 페이지에 프로젝트의 이름과 설명이 들어가야한다.', () => {
      cy.get('.css-12zyx3n > :nth-child(1) > :nth-child(2)').should('have.text', 'Awesome project');
      cy.get('.css-12zyx3n > :nth-child(2) > :nth-child(2)').should('have.text', '으썸한 프로젝트 설명');
    });

    it('프로젝트 정보 페이지에 구성원들의 정보가 들어가야한다.', () => {
      cy.get(':nth-child(1) > .css-1ex1afd-MuiTableCell-root').should('have.text', 'exAdmin');
      cy.get(':nth-child(1) > [style="width: 300px;"]').should('have.text', 'example1@gmail.com');
      cy.get(':nth-child(1) > [style="width: 160px; padding-right: 16px;"]').should('have.text', 'ADMIN');
      cy.get(':nth-child(2) > .css-1ex1afd-MuiTableCell-root').should('have.text', 'exMem');
      cy.get(':nth-child(2) > [style="width: 300px;"]').should('have.text', 'example2@gmail.com');
      cy.get(':nth-child(2) > [style="width: 160px; padding-right: 16px;"]').should('have.text', 'MEMBER');
      cy.get(':nth-child(3) > .css-1ex1afd-MuiTableCell-root').should('have.text', 'exViewer');
      cy.get(':nth-child(3) > [style="width: 300px;"]').should('have.text', 'example3@gmail.com');
      cy.get(':nth-child(3) > [style="width: 160px; padding-right: 16px;"]').should('have.text', 'VIEWER');
      cy.get(':nth-child(4) > .css-1ex1afd-MuiTableCell-root').should('have.text', 'exInvited');
      cy.get(':nth-child(4) > [style="width: 300px;"]').should('have.text', 'example4@gmail.com');
      cy.get(':nth-child(4) > [style="width: 160px; padding-right: 16px;"]').should('have.text', 'INVITED_PERSON');
    });
  });
});
