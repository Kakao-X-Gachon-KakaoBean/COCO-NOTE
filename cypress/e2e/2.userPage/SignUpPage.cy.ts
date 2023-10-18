describe('회원가입 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit(`/signup`);
  });

  context('회원가입 페이지에 들어온 경우 .', () => {
    it('회원가입 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-hgpqov').should('have.text', '회원가입');
      cy.get(':nth-child(2) > a').should('have.text', '로그인');
      cy.get('#name').should('be.visible');
      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#passwordCheck').should('be.visible');
    });
  });

  context('이메일 인증 버튼을 누른 경우', () => {
    it('알맞은 이메일을 입력하면 인증번호가 전송이 되어야 한다.', () => {
      cy.get('input[name="email"]').type('j111239854@naver.com');
      cy.get('button:contains("이메일 인증")').click();
      cy.get('.Toastify__toast-body').should('have.text', '메일로 인증 번호가 발송되었습니다.');
    });

    it('잘못된 이메일을 입력하면 인증번호가 전송이 되어야 한다.', () => {
      cy.get('input[name="email"]').type('잘못된 이메일');
      cy.get('button:contains("이메일 인증")').click();
      cy.get('.Toastify__toast-body').should('have.text', '인증 번호 발송에 실패하였습니다.');
    });
  });
  // context('로그인 버튼 클릭한 경우', () => {
  //   it('로그인 창으로 이동되어야 한다.', () => {
  //     cy.get(':nth-child(2) > a').click();
  //     cy.url().should('include', '/login');
  //   });
  // });
});
