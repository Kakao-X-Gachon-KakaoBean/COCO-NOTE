describe('작업관리 페이지 테스트', () => {
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
  });

  context('작업관리 세부 페이지에 들어온 경우', () => {
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

    it('작업 관리 세부 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-1x074z6').should('have.text', '멤버');
      cy.get('.ant-btn-default').should('have.text', '삭제');
      cy.get('.ant-btn-primary').should('have.text', '수정하기');
      cy.get('.css-k6p0i0 > :nth-child(2)').should('have.text', '멤버 스프린트');
      cy.get('.css-k6p0i0 > :nth-child(3)').should('have.text', '2023-08-01 ~ 2023-08-10');
    });

    it('작업 관리 페이지에 서버에서 가져온 데이터가 있어야 한다.', () => {
      cy.get('.css-16l35ku').should('have.text', '하위작업');
      cy.get(':nth-child(1) > .css-0').should('have.text', '회원가입');
      cy.get(':nth-child(2) > .css-0').should('have.text', '로그인');
      cy.get(':nth-child(1) > .css-14zx4vh > .css-4zjp9 > .ant-select > .ant-select-selector').should(
        'have.text',
        '조연겸'
      );
      cy.get(':nth-child(1) > .css-14zx4vh > [style="width: 7vw;"] > .ant-select-selector').should(
        'have.text',
        '진행 중'
      );
      cy.get(':nth-child(2) > .css-14zx4vh > .css-4zjp9 > .ant-select > .ant-select-selector').should(
        'have.text',
        '추성준'
      );
      cy.get(':nth-child(2) > .css-14zx4vh > [style="width: 7vw;"] > .ant-select-selector').should('have.text', '완료');
    });
  });

  context('삭제하기 버튼을 누르는 경우', () => {
    beforeEach(() => {
      cy.get('.ant-btn-default').should('have.text', '삭제').click();
    });

    it('삭제 확인 모달이 표시 되어야 한다.', () => {
      cy.get('.ant-modal-content').should('be.visible');
      cy.get('.ant-modal-footer > .ant-btn-default').should('have.text', 'Cancel');
      cy.get('.ant-modal-footer > .ant-btn-primary').should('have.text', 'OK');
    });

    it('Cancel 버튼을 누를경우 모달이 사라져야 한다.', () => {
      cy.get('.ant-modal-footer > .ant-btn-default').should('have.text', 'Cancel').click();
      cy.get('.ant-modal-content').should('not.be.visible');
    });

    it('삭제에 성공한 경우 성공 메시지가 상단에 보여야 한다.', () => {
      cy.get('.ant-modal-footer > .ant-btn-primary').should('have.text', 'OK').click();
      cy.intercept({
        method: 'delete',
        url: 'http://localhost:8080/sprints/1',
      }).as('deleteSprint');
      //스프린트 삭제 미완성
      //cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '스프린트가 삭제 되었습니다.');
    });

    it('삭제에 실패한 경우 실패 메시지가 상단에 보여야 한다.', () => {
      cy.get('.ant-modal-footer > .ant-btn-primary').should('have.text', 'OK').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '서버와 연결 되어있지 않습니다.');
    });
  });

  context('담당자를 변경하는 경우', () => {
    beforeEach(() => {
      cy.get(':nth-child(1) > .css-14zx4vh > .css-4zjp9 > .ant-select > .ant-select-selector')
        .should('have.text', '조연겸')
        .click();
      cy.contains('exAdmin').click();
    });

    it('변경에 성공한 경우 성공 메시지가 상단에 보여야 한다.', () => {
      cy.intercept({
        method: 'patch',
        url: 'http://localhost:8080/tasks/1/assignment/1',
      }).as('assignTaskToMember');
      //담당자 변경 미완성
      //cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '스프린트가 삭제 되었습니다.');
    });

    it('변경에 실패한 경우 실패 메시지가 상단에 보여야 한다.', () => {
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '작업자 할당에 실패하였습니다.');
    });
  });

  context('진행 상태를 변경하는 경우', () => {
    beforeEach(() => {
      cy.get(':nth-child(1) > .css-14zx4vh > [style="width: 7vw;"] > .ant-select-selector')
        .should('have.text', '진행 중')
        .click();
      cy.contains('할 일').click();
    });

    it('변경에 성공한 경우 성공 메시지가 상단에 보여야 한다.', () => {
      cy.intercept({
        method: 'PATCH',
        url: 'http://localhost:8080/tasks/1/work-status',
      }).as('changeWorkStatus');
      //작업 상태 변경 미완성
      //cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '스프린트가 삭제 되었습니다.');
    });

    it('변경에 실패한 경우 실패 메시지가 상단에 보여야 한다.', () => {
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '작업 상태를 변경하지 못했습니다.');
    });
  });
});
