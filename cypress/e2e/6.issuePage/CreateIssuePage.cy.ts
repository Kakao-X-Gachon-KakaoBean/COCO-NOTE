describe('이슈 생성 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '**/members/info', {
      fixture: 'memberInfo.json',
    }).as('MemberInfo');
    cy.intercept('POST', '/issues', {
      fixture: 'createIssueContent.json',
    }).as('createIssueContent');
    cy.intercept('GET', '/issues/page?projectId=5&page=0', {
      fixture: 'issueFirstContents.json',
    }).as('issueFirstContents');
    cy.intercept('GET', '/issues/page?projectId=5&page=1', {
      fixture: 'issueLastContents.json',
    }).as('issueLastContents');

    cy.visit(`http://localhost:3000/projects/5/issues/createissue`);
  });

  context('새 이슈 생성 페이지에 들어온 경우', () => {
    it('이슈 생성 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get(':nth-child(1) > .ant-btn').should('have.text', '뒤로 가기');
      cy.get(':nth-child(4) > .ant-btn').should('have.text', '제출');
      cy.get('.css-wvf9t0').should('be.visible');
      cy.get('#title').should('have.attr', 'placeholder', '제목');
    });
  });

  context('새 이슈를 생성 실패 한 경우', () => {
    it('이슈 제목만 입력했을 경우 에러 메시지가 상단에 보여야 한다.', () => {
      cy.get('.w-md-editor-text-input').clear();
      cy.get('.w-md-editor-text-input').clear().type('이슈 제목입니다');
      cy.get(':nth-child(4) > .ant-btn').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '생성할 이슈 제목을 입력해주세요.');
    });

    it('이슈 내용만 입력했을 경우 에러 메시지가 상단에 보여야 한다.', () => {
      cy.get('.w-md-editor-text-input').clear().type('이슈 내용입니다');
      cy.get('.w-md-editor-text-input').clear();
      cy.get(':nth-child(4) > .ant-btn').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '모든 정보를 입력해주세요.');
    });
  });

  context('새 이슈를 생성 완료 한 경우', () => {
    it('생성된 이슈가 이슈 페이지에 보여야 한다.', () => {
      cy.get('#title').type('이슈 제목');
      cy.get('.w-md-editor-text-input').type('이슈 내용입니다');
      cy.get(':nth-child(4) > .ant-btn').click();
      cy.visit(`http://localhost:3000/projects/5/issues`);
    });
  });
});
