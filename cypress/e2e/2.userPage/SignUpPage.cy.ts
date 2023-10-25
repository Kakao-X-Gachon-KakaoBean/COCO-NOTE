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

  context('이름을 입력 할 경우', () => {
    it('알맞은 이름을 입력하면 통과한다.', () => {
      cy.get('#name').type('홍길동');
      cy.get('#name').invoke('val').should('not.match', /\d/);
    });
  });

  context('이메일 인증 버튼을 누른 경우', () => {
    it('알맞은 이메일을 입력하면 인증번호가 전송이 되어야 한다.', () => {
      cy.get('input[name="email"]').type('j111239854@naver.com');
      cy.get('button:contains("이메일 인증")').click();
      cy.get('.Toastify__toast-body').should('have.text', '메일로 인증 번호가 발송되었습니다.');
    });

    it('잘못된 이메일을 입력하면 인증번호가 전송 되지 않는다.', () => {
      cy.get('input[name="email"]').type('잘못된 이메일');
      cy.get('button:contains("이메일 인증")').click();
      cy.get('.Toastify__toast-body').should('have.text', '인증 번호 발송에 실패하였습니다.');
    });
  });

  context('비밀번호 입력을 할 경우', () => {
    it('비밀번호와 비밀번호 확인이 서로 다르면 오류가 발생해야 한다.', () => {
      cy.get('input[name="password"]').type('password');
      cy.get('input[name="passwordCheck"]').type('otherPassword');
      cy.get('input[name="password"]').then($passwordInput => {
        const password = $passwordInput.val();
        cy.get('input[name="passwordCheck"]').then($passwordCheckInput => {
          const passwordCheck = $passwordCheckInput.val();
          expect(password).not.to.equal(passwordCheck);
        });
      });
      cy.get('.css-14dnijj').should('have.text', '비밀번호가 일치하지 않습니다!');
    });

    it('비밀번호와 비밀번호 확인이 같으면 통과한다.', () => {
      cy.get('input[name="password"]').type('password');
      cy.get('input[name="passwordCheck"]').type('password');
      cy.get('input[name="password"]').then($passwordInput => {
        const password = $passwordInput.val();
        cy.get('input[name="passwordCheck"]').then($passwordCheckInput => {
          const passwordCheck = $passwordCheckInput.val();
          expect(password).to.equal(passwordCheck);
        });
      });
      cy.get('.css-uhoc6f').should('have.text', '비밀번호가 일치합니다!');
    });
  });

  context('로그인 버튼 클릭한 경우', () => {
    it('로그인 창으로 이동되어야 한다.', () => {
      cy.get(':nth-child(2) > a').click();
      cy.url().should('include', '/login');
    });
  });
});
