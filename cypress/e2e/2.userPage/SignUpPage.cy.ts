describe('회원가입 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit(`/signup`);
  });

  context('회원가입 페이지에 들어온 경우 .', () => {
    it('로그인 페이지로 이동하는 버튼이 있어야한다.', () => {
      cy.get('.css-1byfn0f').should('be.visible');
    });
  });
});
