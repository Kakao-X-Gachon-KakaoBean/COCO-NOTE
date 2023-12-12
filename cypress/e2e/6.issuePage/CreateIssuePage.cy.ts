describe('이슈 생성 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '**/members/info', {
      fixture: 'memberInfo.json',
    }).as('MemberInfo');
    cy.intercept('GET', '**/projects/5/issues', {
      fixture: 'issueFirstContents.json',
    }).as('IssueContents');
    cy.setCookie(
      'accessToken',
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjk5NDQyNjQwLCJleHAiOjE2OTk0NDM1NDB9.WVj3PdtRj8SBg2xOSTvM1ZK8hJRheMxiiAR3bFir6w3v4IDe-MmMgQx1BdSPqAXQIeGDiAjyP-_YPrX1MK4hUA'
    );
    cy.intercept('POST', '/manuscripts', {
      fixture: 'createIssueContent.json',
    }).as('CreateIssueContent');
    cy.visit(`http://localhost:3000/projects/5/issues/createissue`);
  });

  context('새 이슈 생성 페이지에 들어온 경우', () => {
    it('이슈 생성 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get(':nth-child(1) > .ant-btn').should('have.text', '뒤로 가기');
      cy.get(':nth-child(4) > .ant-btn').should('have.text', '제출');
      //인풋 창
      cy.get('.css-wvf9t0').should('be.visible');
      cy.get('#title').should('have.attr', 'placeholder', '제목');
    });
  });

  context('새 이슈를 생성 실패 한 경우', () => {
    it('에러 메시지가 상단에 보여야 한다..', () => {
      cy.get(':nth-child(4) > .ant-btn').click();
      cy.get('.Toastify__toast-body > :nth-child(2) > div').should('have.text', '이슈 생성에 실패하였습니다.');
    });
  });

  context('새 이슈를 생성 완료 한 경우', () => {
    it('생성된 이슈가 이슈 페이지에 보여야 한다.', () => {
      cy.get('#title').type('이슈 제목');
      cy.get('.w-md-editor-text-input').type('이슈 내용입니다');
      //여기서 제출안됨 ㅜ
      cy.get(':nth-child(4) > .ant-btn').click();
      cy.get('.Toastify__toast-body > :nth-child(2) > div').should('have.text', '이슈를 생성하였습니다.');
    });
  });
});
