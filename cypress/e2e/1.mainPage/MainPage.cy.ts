describe('이니셜 테스트', () => {
  beforeEach(() => {
    cy.visit(`/`);
  });

  context('이니셜 페이지에 들어온 경우 .', () => {
    it('로그인 페이지로 이동하는 버튼이 있어야한다.', () => {
      cy.get('.ant-btn > span').should('be.visible');
    });
    it('화면에 문구가 보여야 한다.', () => {
      cy.get('.css-9tw42w').should('have.text', 'COCO:NOTE');
      cy.get('.css-1d0ucni').should('have.text', '프로젝트의 성장을 효과적으로 공유하세요');
      cy.get('.ant-btn').should('have.text', '로그인하여 시작하기');
    });
    it('로그인 페이지로 이동하는 버튼을 클릭하면 로그인 페이지로 이동되어야 한다.', () => {
      cy.get('.ant-btn').click();
      cy.url().should('include', '/login');
    });
  });
});
