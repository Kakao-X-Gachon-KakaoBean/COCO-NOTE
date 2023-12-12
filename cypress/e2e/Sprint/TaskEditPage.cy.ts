describe('하위 작업 수정 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '**/projects/5/members', {
      fixture: 'projectMemberContents.json',
    }).as('MemberInfo');
    cy.intercept('GET', '/sprints?projectId=5', {
      fixture: 'sprintContents.json',
    }).as('sprintContents');
    cy.intercept('GET', '/sprints/1', {
      fixture: 'sprintDetailContents.json',
    }).as('sprintDetailContents');
    cy.intercept('GET', '/tasks/1', {
      fixture: 'taskDetailContents.json',
    }).as('taskDetailContents');
    cy.setCookie(
      'accessToken',
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjk5NDQyNjQwLCJleHAiOjE2OTk0NDM1NDB9.WVj3PdtRj8SBg2xOSTvM1ZK8hJRheMxiiAR3bFir6w3v4IDe-MmMgQx1BdSPqAXQIeGDiAjyP-_YPrX1MK4hUA'
    );
    //바로 visit하면 콘텐츠가 표시되지않는 이슈 발생
    cy.visit(`/projects/5/sprints`);
    cy.get('[data-row-key="0"] > .ant-table-cell-fix-left > .ant-table-row-expand-icon').click();
    cy.get(':nth-child(3) > .ant-table-cell-fix-left > div').should('have.text', '회원가입').click();
    cy.get('.ant-btn-primary').should('have.text', '수정하기').click();
  });

  context('하위 작업 수정 페이지에 들어온 경우', () => {
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

    it('하위 작업 세부 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-w5pz8q > .ant-input').should('have.text', '회원가입');
      cy.get('[placeholder="하위작업 설명"]').should('have.text', '카카오, 구글 등 소셜 로그인을 포함한다.');
      cy.get('.ant-btn').should('have.text', '완료하기');
    });
  });

  context('내용을 수정할 경우', () => {
    it('하위작업 이름과 설명을 수정한 경우 수정된 내용이 입력 되어야한다.', () => {
      cy.get('.css-w5pz8q > .ant-input').clear();
      cy.get('[placeholder="하위작업 설명"]').clear();

      cy.get('.css-w5pz8q > .ant-input').type('수정된 하위작업 이름');
      cy.get('[placeholder="하위작업 설명"]').type('수정된 하위작업 설명');

      cy.get('.css-w5pz8q > .ant-input').should('have.text', '수정된 하위작업 이름');
      cy.get('[placeholder="하위작업 설명"]').should('have.text', '수정된 하위작업 설명');
    });
  });

  context('완료하기 버튼을 누르는 경우', () => {
    it('수정에 실패한 경우 실패 메시지가 상단에 보여야 한다.', () => {
      cy.get('.ant-btn').should('have.text', '완료하기').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '하위작업 수정에 실패하였습니다.');
    });

    it('수정에 성공한 경우 성공 메시지가 상단에 보여야 한다.', () => {
      cy.intercept('PATCH', '/tasks/1', {
        fixture: 'editTask.json',
      }).as('editTask');

      cy.get('.ant-btn').should('have.text', '완료하기').click();
      cy.wait('@editTask').then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '하위작업 수정이 완료되었습니다.');
      });
      cy.url().should('include', '/projects/5/sprints/tasks/1');
    });
  });
});
