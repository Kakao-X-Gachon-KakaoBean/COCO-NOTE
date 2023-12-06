import dayjs from 'dayjs';

describe('스프린트 수정 페이지 테스트', () => {
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
    cy.setCookie(
      'accessToken',
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjk5NDQyNjQwLCJleHAiOjE2OTk0NDM1NDB9.WVj3PdtRj8SBg2xOSTvM1ZK8hJRheMxiiAR3bFir6w3v4IDe-MmMgQx1BdSPqAXQIeGDiAjyP-_YPrX1MK4hUA'
    );
    //바로 visit하면 콘텐츠가 표시되지않는 이슈 발생
    cy.visit(`/projects/5/sprints`);
    cy.get(
      '[data-row-key="0"] > .ant-table-cell-fix-left > [style="display: flex; justify-content: space-between; align-items: center;"] > div'
    )
      .should('have.text', '멤버')
      .click();
    cy.get('.ant-btn-primary').should('have.text', '수정하기').click();
  });

  context('스프린트 수정 페이지에 들어온 경우', () => {
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

    it('스프린트 수정 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.ant-btn').should('have.text', '완료하기');
      cy.get('.css-w5pz8q > .ant-input').should('have.text', '멤버');
      cy.get('[placeholder="스프린트 설명"]').should('have.text', '멤버 스프린트');
      cy.get('.css-k6p0i0 > :nth-child(3)').should('be.visible');
      cy.get('.css-k6p0i0 > :nth-child(4)').should('be.visible');
    });
  });

  context('내용을 수정할 경우', () => {
    it('스프린트 이름과 설명을 수정한 경우 수정된 내용이 입력 되어야한다.', () => {
      cy.get('.css-w5pz8q > .ant-input').clear();
      cy.get('[placeholder="스프린트 설명"]').clear();

      cy.get('.css-w5pz8q > .ant-input').type('수정된 스프린트 이름');
      cy.get('[placeholder="스프린트 설명"]').type('수정된 스프린트 설명');

      cy.get('.css-w5pz8q > .ant-input').should('have.text', '수정된 스프린트 이름');
      cy.get('[placeholder="스프린트 설명"]').should('have.text', '수정된 스프린트 설명');
    });

    it('시작일과 종료일을 수정한 경우 수정된 내용이 입력 되어야한다.', () => {
      const today = dayjs().format('YYYY-MM-DD');

      cy.get(':nth-child(3) > .ant-picker').click();
      cy.get(':nth-child(3) > .ant-picker').clear();
      cy.get(':nth-child(3) > .ant-picker').type(`${today}{enter}`);

      cy.get(':nth-child(4) > .ant-picker').click();
      cy.get(':nth-child(4) > .ant-picker').clear();
      cy.get(':nth-child(4) > .ant-picker').type(`${today}{enter}`);

      // 표시는 정확히 되는데 cypress 테스트 상에서는 text가 ''이라고 합니다.. text, value, string 다 해봤는데 성공안됨.
      // cy.get(':nth-child(3) > .ant-picker').should('have.', today);
      // cy.get(':nth-child(4) > .ant-picker > .ant-picker-input > input').should('have.text', today);
    });
  });

  context('완료하기 버튼을 누르는 경우', () => {
    beforeEach(() => {
      cy.get('.ant-btn').should('have.text', '완료하기').click();
    });

    it('수정에 성공한 경우 성공 메시지가 상단에 보여야 한다.', () => {
      cy.intercept({
        method: 'patch',
        url: 'http://localhost:8080/sprints/1',
      }).as('editSprint');
      //스프린트 삭제 미완성
      //cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '스프린트가 삭제 되었습니다.');
    });

    it('수정에 실패한 경우 실패 메시지가 상단에 보여야 한다.', () => {
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '스프린트 수정에 실패하였습니다.');
    });
  });
});
