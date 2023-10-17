describe('로그인 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit(`/login`);
  });

  context('로그인 페이지에 들어온 경우 .', () => {
    it('로그인 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-1byfn0f > a').should('have.text', 'COCO:NOTE');
      cy.get('.css-rk9z86').should('have.text', '비밀번호 변경');
      cy.get('.css-rk9z86').should('have.text', '회원 가입');
    });
  });
});
