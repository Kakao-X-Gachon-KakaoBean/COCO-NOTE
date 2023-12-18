describe('릴리즈 노트 원고 단건 조회 페이지 테스트', () => {
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
    cy.intercept('GET', '/manuscripts/16', {
      fixture: 'singleManuscript.json',
    }).as('getSingleManuscript');
    cy.intercept('PATCH', '/manuscripts/16/access-status', {
      fixture: 'getAccessEditManuscript.json',
    }).as('getManuscriptAccess');
    cy.intercept('PATCH', '/manuscripts/16', {
      fixture: 'saveEditedManuscript.json',
    }).as('saveEditedManuscript.json');
    cy.visit(`/projects/5/manuscripts/16`);
    return cy.fixture('singleManuscript.json').then(singleManuscript => {
      singleManuscript.manuscriptStatus = 'Modified';
      cy.writeFile('cypress/fixtures/singleManuscript.json', singleManuscript);
    });
  });

  context('릴리즈 노트 원고 단건 페이지에 들어온 경우', () => {
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
      cy.get(
        ':nth-child(1) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(3) > .ant-tree-node-content-wrapper'
      ).should('have.text', '2.7V');
      cy.get('.css-16kkvyw > .ant-btn > span').should('have.text', '+');
      cy.get(
        ':nth-child(3) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(1) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '배포된 릴리즈 노트 목록');
      cy.get(
        ':nth-child(3) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(2) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '1.1V');
      cy.get(':nth-child(3) > .css-1eid011 > .css-1m0b3tt').should('have.text', '작업 관리');
      cy.get(':nth-child(4) > .css-1eid011 > .css-1m0b3tt').should('have.text', '이슈');
    });

    it('릴리즈 노트 원고 단건의 제목과 버전, 날짜, 내용, 버튼이 정상적으로 표시되어야 한다.', () => {
      cy.get('.css-140rbgv > .ant-typography').should('have.text', '2.6V 릴리즈 노트');
      cy.get(':nth-child(2) > .ant-typography').should('have.text', 'Version 2.6V');
      cy.get(':nth-child(3) > .ant-typography').should('have.text', '23-08-03 12:17');
      cy.get('p').should('have.text', '새로운 릴리즈 노트 원고 내용입니다.');

      cy.get('.css-1cr3nir > :nth-child(3)').should('have.text', '가장 마지막에 수정한 멤버: 김윤호');

      // 수정하기 버튼 확인
      cy.get('.css-yx8f8q > .ant-btn-default').should('exist');
      cy.get('.css-yx8f8q > .ant-btn-default').should('have.attr', 'type', 'button');
      cy.get('.css-yx8f8q > .ant-btn-default').should('contain', '수정하기');

      // 배포하기 버튼 확인
      cy.get('.ant-btn-primary').should('exist');
      cy.get('.ant-btn-primary').should('have.attr', 'type', 'button');
      cy.get('.ant-btn-primary').should('contain', '릴리즈 노트 배포');
    });
  });
  context('릴리즈 노트 원고의 수정 버튼을 클릭했을 경우', () => {
    it('릴리즈 노트 원고 수정 페이지로 이동 후 수정 및 저장이 가능해야 한다.', () => {
      cy.get('.css-yx8f8q > .ant-btn-default').click();
      cy.url().should('include', '/manuscripts/16/edit');
      cy.get('.w-md-editor-text-input').type('내용을 추가하겠습니다.');

      // 저장하기 버튼
      cy.get('.ant-btn-primary').should('exist');
      cy.get('.ant-btn-primary').should('have.attr', 'type', 'button');
      cy.get('.ant-btn-primary').should('contain', '저장하기');
      cy.get('.ant-btn-primary').click();

      cy.url().should('include', '/manuscripts/16');
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '릴리즈 노트가 저장되었습니다.');
      // toast message 받기
    });
  });
});
