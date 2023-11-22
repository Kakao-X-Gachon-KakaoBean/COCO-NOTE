describe('로그인 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit(`/login`);
  });

  context('로그인 페이지에 들어온 경우 .', () => {
    it('로그인 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-1byfn0f > a').should('have.text', 'COCONOTE');
      cy.get('.css-rk9z86').should('have.text', '비밀번호 변경');
      cy.get(':nth-child(3) > a').should('have.text', '회원 가입');
    });

    it('잘못된 이메일을 입력한 경우', () => {
      cy.get('input[name="id"]').type('잘못된 이메일');
    });

    it('알맞은 이메일을 입력한 경우', () => {
      cy.get('input[name="id"]').type('j949854@gmail.com');
    });

    it('로그인에 실패 할 경우', () => {
      cy.get('input[name="id"]').type('잘못된 이메일');
      cy.get('input[name="password"]').type('qqq!');
      cy.get('button[type="submit"]').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '이메일과 비밀번호가 일치하지 않습니다.');
    });

    it('로그인에 성공 할 경우', () => {
      cy.get('input[name="id"]').type('j949854@gmail.com');
      cy.get('input[name="password"]').type('1111');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/main');
    });

    it('구글 로그인을 할 경우', () => {});
    it('카카오 로그인을 할 경우', () => {});
  });
});
