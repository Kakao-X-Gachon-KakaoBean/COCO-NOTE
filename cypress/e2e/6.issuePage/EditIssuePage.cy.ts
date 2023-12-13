describe('이슈 수정 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '/issues/page?projectId=5&page=0', {
      fixture: 'issueFirstContents.json',
    }).as('issueFirstContents');
    cy.intercept('GET', '/issues/1', {
      fixture: 'eachIssueContent.json',
    }).as('eachIssueContent');
    cy.intercept('PATCH', '/issues/1', {
      fixture: 'editIssueContent.json',
    }).as('EditIssueContent');
    cy.intercept('DELETE', '/issues/1', {
      fixture: 'deleteComment.json',
    }).as('DeleteComment');
    cy.visit(`/projects/5/issues/1`);
  });

  context('이슈 수정 페이지에 들어온 경우', () => {
    it('이슈 수정 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-1rg5wmd > :nth-child(2)').click();
      cy.url().should('include', '/editIssue');
      cy.get(':nth-child(1) > .ant-btn').should('have.text', '뒤로 가기');
      cy.get(':nth-child(4) > .ant-btn').should('have.text', '수정하기');
      cy.get('.css-wvf9t0').should('be.visible');
      cy.get('#title').should('have.value', '이슈 제목');
      cy.get('.w-md-editor-text-input').should('have.text', '이슈 내용');
    });
  });

  context('작성된 이슈를 수정,삭제 할 경우', () => {
    it('수정 할 부분을 입력하지 않고 수정하기 버튼을 누르면 이슈가 수정되면 안된다.', () => {
      cy.get('.css-1rg5wmd > :nth-child(2)').click();
      cy.url().should('include', '/editIssue');
      cy.get('#title').clear().type('');
      cy.get('.w-md-editor-text-input').clear().type('');
      cy.get('.css-1vczc1y > .ant-btn').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '제목과 본문을 입력해주세요.');
    });

    it('수정 할 부분을 입력 후 수정하기 버튼을 누르면 이슈가 수정되어야 한다.', () => {
      cy.get('.css-1rg5wmd > :nth-child(2)').click();
      cy.url().should('include', '/editIssue');
      cy.get('#title').clear().type('수정 될 제목');
      cy.get('.w-md-editor-text-input').clear().type('수정 될 내용');
      cy.get('.css-1vczc1y > .ant-btn').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '수정 완료하였습니다.');
      cy.url().should('include', '/issues');
    });

    it('삭제 버튼을 누르면 이슈가 삭제되어야 한다.', () => {
      cy.get('.css-1rg5wmd > :nth-child(1)').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '이슈가 삭제되었습니다.');
      cy.url().should('include', '/issues');
    });
  });
});
