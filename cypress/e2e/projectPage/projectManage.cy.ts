describe('프로젝트 관리 페이지 테스트', () => {
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
});
