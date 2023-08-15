describe('스프린트 테스트', () => {
  beforeEach(() => {
    const projectId = 4;
    cy.visit(`http://localhost:3000/projects/${projectId}/sprints`);
    cy.intercept('GET', '**/sprints?projectId=*', {
      fixture: 'sprintContents.json',
    }).as('SprintResult');
  });

  context('설문 통계 페이지에 들어온 경우 .', () => {
    it('다음 질문으로 이동하는 버튼이 있어야 한다.(맨처음)', () => {
      cy.get('.css-vm5xzw').should('be.visible');
    });
    it('이전, 다음 질문으로 이동하는 버튼이 있어야 한다.(다음 질문을 한번이상 이동했을 경우)', () => {
      cy.get('.css-vm5xzw').click();
      cy.get('.css-1ultooz > :nth-child(2)').should('be.visible');
      cy.get('.css-1ultooz > :nth-child(1)').should('be.visible');
    });
  });
});
