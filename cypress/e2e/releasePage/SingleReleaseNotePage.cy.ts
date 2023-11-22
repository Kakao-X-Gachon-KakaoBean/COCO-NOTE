describe('배포된 릴리즈 노트 단건 조회 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '/manuscripts?projectId=5', {
      fixture: 'manuscriptTree.json',
    }).as('manuscriptTree');
    cy.intercept('GET', '/release-notes?projectId=5', {
      fixture: 'releasenoteTree.json',
    }).as('releasenoteTree');
    cy.intercept('GET', '/release-notes/1', {
      fixture: 'singleReleasenote.json',
    }).as('releasenote');
    cy.visit(`/projects/5/release-notes/1`);
  });

  context('릴리즈 노트 전체보기 페이지에 들어온 경우', () => {
    it('사이드 바에 해당하는 문구가 존재해야한다.', () => {
      cy.get('.selected').should('be.visible');
      cy.get('.selected > .css-1a1tdkp').should('have.text', 'Awesome project');
      cy.get(':nth-child(2) > .notSelected > .css-1a1tdkp').should('have.text', 'kakaoBean Project');
      cy.get('.css-gkszvj > .css-1a1tdkp').should('have.text', '+');
    });

    it('세부 사이드 바에 존재 하는 문구가 있어야 한다.', () => {
      cy.get('.selected > .css-1a1tdkp').should('have.text', 'Awesome project');
      cy.get(':nth-child(2) > .css-1eid011 > .css-1m0b3tt').should('have.text', '릴리즈 노트');
      cy.get(
        ':nth-child(1) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(1) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '수정 중인 릴리즈 노트');
      cy.get(
        ':nth-child(1) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(2) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '2.6V');
      cy.get('.ant-btn > span').should('have.text', '+');
      cy.get(
        ':nth-child(3) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(1) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '배포된 릴리즈 노트 목록');
      cy.get(
        ':nth-child(3) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(2) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '1.1V');
      cy.get(':nth-child(3) > .css-1eid011 > .css-1m0b3tt').should('have.text', '작업 관리');
      cy.get(':nth-child(4) > .css-1eid011 > .css-1m0b3tt').should('have.text', '이슈');
    });

    it('배포된 릴리즈 노트 단건의 제목과 버전, 날짜, 내용이 정상적으로 표시되어야 한다.', () => {
      cy.get('.css-w21myy > .ant-typography').should('have.text', '1.1V 단건 조회 버그 수정');
      cy.get(':nth-child(2) > .ant-typography').should('have.text', 'Version 1.1V');
      cy.get(':nth-child(3) > .ant-typography').should('have.text', '23-08-16 03:07');
      cy.get('p').should('have.text', '릴리즈 노트 원고 단건 조회에 관련된 버그를 수정했습니다. 자세한 사항은 ...');
    });
  });
});
