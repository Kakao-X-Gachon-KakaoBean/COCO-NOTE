describe('세부 이슈 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '/issues/page?projectId=5&page=0', {
      fixture: 'issueFirstContents.json',
    }).as('issueFirstContents');
    cy.intercept('GET', '/issues/1', {
      fixture: 'eachIssueContent.json',
    }).as('eachIssueContent');
    cy.intercept('POST', '/comments', {
      fixture: 'createComment.json',
    }).as('CreateComment');
    cy.intercept('PATCH', '/comments/33', {
      fixture: 'editComment.json',
    }).as('EditComment');
    cy.intercept('DELETE', '/comments/33', {
      fixture: 'deleteComment.json',
    }).as('DeleteComment');
    cy.visit(`/projects/5/issues/1`);
  });

  context('세부 이슈 페이지에 들어온 경우', () => {
    it('사이드 바에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.selected').should('be.visible');
      cy.get('.selected > .css-1a1tdkp').should('have.text', 'Awesome project');
      cy.get(':nth-child(2) > .notSelected > .css-1a1tdkp').should('have.text', 'kakaoBean Project');
      cy.get('.css-gkszvj > .css-1a1tdkp').should('have.text', '+');
    });

    it('세부 사이드 바에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.selected > .css-1a1tdkp').should('have.text', 'Awesome project');
      cy.get(':nth-child(2) > .css-1eid011 > .css-1m0b3tt').should('have.text', '릴리즈 노트');
      cy.get(':nth-child(3) > .css-1eid011 > .css-1m0b3tt').should('have.text', '작업 관리');
      cy.get(':nth-child(4) > .css-1eid011 > .css-1m0b3tt').should('have.text', '이슈');
    });

    it('세부 이슈 페이지에 존재 하는 문구, 버튼들이 있어야 한다.', () => {
      cy.get('.css-1r37wsv > :nth-child(1)').should('have.text', '이슈 제목');
      cy.get('.css-1rg5wmd > :nth-child(1)').should('be.visible');
      cy.get('.css-1rg5wmd > :nth-child(2)').should('be.visible');
      cy.get('.css-1diyz6t > .ant-btn').should('be.visible');
      cy.get('.css-jqvg2j > .ant-btn').should('be.visible');
      cy.get('.css-1rj44r4').should('be.visible');
      cy.get('.css-1rj44r4').type('안녕하세요').should('have.value', '안녕하세요');
      cy.get('.css-1rj44r4').clear().should('have.value', '');
    });
  });
  context('댓글 추가를 할 경우', () => {
    it('댓글이 존재하면 댓글 내용이 회면에 보여야 한다.', () => {
      cy.get('.css-1nkrczw > :nth-child(1)').should('be.visible');
      cy.get(':nth-child(1) > .css-1hvtwpi > .css-1v3fui > :nth-child(1) > div').should('have.text', '안수빈');
      cy.get(':nth-child(1) > .css-1peu8fi').should('have.text', '1번 댓글');
      cy.get(':nth-child(1) > .css-1hvtwpi > :nth-child(2)').should('have.text', '23. 8. 7. ?? 9:49');
    });

    it('댓글을 입력하고 Submit 버튼을 누르면 댓글이 달려야 한다.', () => {
      cy.get('.css-1rj44r4').type('안녕하세요').should('have.value', '안녕하세요');
      cy.get('.css-jqvg2j > .ant-btn').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '댓글을 달았습니다.');
    });

    it('아무것도 입력하지 않고 Submit 버튼을 누르면 댓글이 달리지않는다.', () => {
      cy.get('.css-1rj44r4').clear();
      cy.get('.css-jqvg2j > .ant-btn').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '댓글을 입력해주세요.');
    });
  });

  context('댓글 수정을 할 경우', () => {
    it('수정 버튼을 누르면 댓글 수정 모달이 나와야한다.', () => {
      cy.get(':nth-child(1) > .css-1hvtwpi > .css-1v3fui > :nth-child(2) > :nth-child(1)').should('be.visible');
      cy.get(':nth-child(1) > .css-1hvtwpi > .css-1v3fui > :nth-child(2) > :nth-child(1)').click();
      cy.get('.ant-modal-content').should('be.visible');
      cy.get('.ant-input').should('have.attr', 'placeholder', '댓글 내용');
      cy.get('.ant-modal-footer > div > .ant-btn').should('have.text', '변경하기');
    });

    it('수정 할 내용을 입력하지 않고 버튼을 누르면 댓글이 수정되지않는다.', () => {
      cy.get(':nth-child(1) > .css-1hvtwpi > .css-1v3fui > :nth-child(2) > :nth-child(1)').click();
      cy.get('.ant-input').clear();
      cy.get('.ant-modal-footer > div > .ant-btn').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '수정할 내용을 입력해주세요.');
    });

    it('수정 할 내용을 입력하고 버튼을 누르면 댓글이 수정되어야한다.', () => {
      cy.get(':nth-child(1) > .css-1hvtwpi > .css-1v3fui > :nth-child(2) > :nth-child(1)').click();
      cy.get('.ant-input').type('댓글 내용 변경하기').should('have.value', '댓글 내용 변경하기');
      cy.get('.ant-modal-footer > div > .ant-btn').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '수정 완료하였습니다.');
    });
  });

  context('댓글 삭제를 할 경우', () => {
    it('댓글 삭제 버튼을 누르면 댓글이 삭제되어야 한다.', () => {
      cy.get(':nth-child(1) > .css-1hvtwpi > .css-1v3fui > :nth-child(2) > :nth-child(2)').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '댓글이 삭제되었습니다.');
    });
  });
});
