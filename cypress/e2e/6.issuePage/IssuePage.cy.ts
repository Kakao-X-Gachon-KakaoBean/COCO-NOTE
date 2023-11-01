describe('이슈 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '**/members/info', {
      fixture: 'memberInfo.json',
    }).as('MemberInfo');
    cy.intercept('GET', '**/projects/5/issues', {
      fixture: 'issueContents.json',
    }).as('IssueContents');
    cy.visit(`http://localhost:3000/projects/5/issues/createissue`);
  });

  context('이슈 페이지에 들어온 경우', () => {
    it('이슈 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      //왼쪽 버튼
      cy.get('[disabled=""]').should('be.visible');
      //오른쪽 버튼
      cy.get('.css-n6k8c8 > :nth-child(3)').should('be.visible');
      cy.get('.css-172apq8').should('have.text', '이슈');
      cy.get('.ant-btn > span').should('have.text', '새 이슈 생성');
    });
  });
  context('새 이슈 생성 버튼을 클릭한 경우', () => {
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
      cy.get('.Toastify__toast-body > :nth-child(2) > div').should('have.text', '이슈 생성에 실패하였습니다.');
    });
  });

  context('새 이슈를 생성 완료 한 경우', () => {
    it('생성된 이슈가 이슈 페이지에 보여야 한다.', () => {
      cy.get('#title').type('이슈 제목');
      cy.get('.w-md-editor-text-input').type('이슈 내용입니다');
      //여기서 제출안됨 ㅜ
      cy.get('.Toastify__toast-body > :nth-child(2) > div').should('have.text', '이슈를 생성하였습니다.');
    });
  });
});

// cy.get(':nth-child(1) > .ant-btn').should('have.text', '뒤로 가기');
