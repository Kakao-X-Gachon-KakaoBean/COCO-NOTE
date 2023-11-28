import dayjs from 'dayjs';

describe('작업관리 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '/sprints?projectId=5', {
      fixture: 'sprintContents.json',
    }).as('sprintContents');
    cy.setCookie(
      'accessToken',
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjk5NDQyNjQwLCJleHAiOjE2OTk0NDM1NDB9.WVj3PdtRj8SBg2xOSTvM1ZK8hJRheMxiiAR3bFir6w3v4IDe-MmMgQx1BdSPqAXQIeGDiAjyP-_YPrX1MK4hUA'
    );
    cy.visit(`/projects/5/sprints`);
  });

  context('작업관리 페이지에 들어온 경우', () => {
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

    it('작업 관리 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-1k30mj7').should('have.text', '작업 관리');
      cy.get('.ant-table-thead > tr > .ant-table-cell-fix-left').should('have.text', '스프린트');
      cy.get('.ant-table-thead > tr > :nth-child(2)').should('be.visible');
      cy.get('.css-k6p0i0 > :nth-child(3)').should('have.text', '스프린트 추가하기');
    });

    it('작업 관리 페이지에 서버에서 가져온 데이터가 있어야 한다.', () => {
      cy.get('[data-row-key="0"] > .ant-table-cell-fix-left > .ant-table-row-expand-icon').should('be.visible');
      cy.get(
        '[data-row-key="0"] > .ant-table-cell-fix-left > [style="display: flex; justify-content: space-between; align-items: center;"] > div'
      ).should('have.text', '멤버');
      cy.get(
        '[data-row-key="0"] > .ant-table-cell-fix-left > [style="display: flex; justify-content: space-between; align-items: center;"] > .ant-btn'
      ).should('have.text', '할일 추가');
      cy.get('[data-row-key="0"] > [style="background: rgb(35, 196, 131);"]').should('be.visible');
      cy.get('[data-row-key="1"] > .ant-table-cell-fix-left > .ant-table-row-expand-icon').should('be.visible');
      cy.get(
        '[data-row-key="1"] > .ant-table-cell-fix-left > [style="display: flex; justify-content: space-between; align-items: center;"] > div'
      ).should('have.text', '상품');
      cy.get(
        '[data-row-key="1"] > .ant-table-cell-fix-left > [style="display: flex; justify-content: space-between; align-items: center;"] > .ant-btn'
      ).should('have.text', '할일 추가');
      cy.get('[data-row-key="1"] > [style="background: rgb(35, 196, 131);"]').should('be.visible');
    });

    it('각 스프린트의 + 버튼을 누르면 세부 할일들이 표시되어야 한다.', () => {
      cy.get('[data-row-key="0"] > .ant-table-cell-fix-left > .ant-table-row-expand-icon').click();
      cy.get(':nth-child(3) > .ant-table-cell-fix-left > div').should('have.text', '회원가입');
      cy.get(':nth-child(4) > .ant-table-cell-fix-left > div').should('have.text', '로그인');
      cy.get('[data-row-key="1"] > .ant-table-cell-fix-left > .ant-table-row-expand-icon').click();
      cy.get(':nth-child(6) > .ant-table-cell-fix-left > div').should('have.text', '상품 조회');
    });
  });

  context('스프린트 추가하기 버튼을 누를경우', () => {
    beforeEach(() => {
      cy.get('.css-k6p0i0 > :nth-child(3)').click();
    });

    it('스프린트 추가하기 모달이 표시되어야 한다.', () => {
      cy.get('.ant-modal-content').should('be.visible');
      cy.get('[placeholder="스프린트 명"]').should('be.visible');
      cy.get('[placeholder="스프린트 설명"]').should('be.visible');
      cy.get('.ant-modal-footer > .ant-btn-default').should('have.text', 'Cancel');
      cy.get('.ant-btn-primary').should('have.text', 'OK');
    });

    it('생성에 실패할 경우 에러 메시지가 상단에 보여야 한다.', () => {
      cy.get('.ant-btn-primary').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '스프린트 생성에 실패했습니다.');
    });

    it('생성에 성공한 경우 성공 메시지가 상단에 보여야 한다.', () => {
      const today = dayjs().format('YYYY-MM-DD');

      cy.get('[placeholder="스프린트 명"]').type('테스트');
      cy.get('[placeholder="스프린트 설명"]').type('테스트 입니다.');
      cy.get(':nth-child(3) > .ant-picker').type(`${today}{enter}`);
      cy.get(':nth-child(4) > .ant-picker').type(`${today}{enter}`);
      cy.get('.ant-btn-primary').should('have.text', 'OK').click();
      cy.intercept({
        method: 'post',
        url: 'http://localhost:8080/sprints',
      }).as('createSprint');
      // cy.intercept('POST', 'http://localhost:8080/sprints', req => {
      //   const { body } = req;
      //   req.continue(res => {
      //     res.body.data.listBankAccount = [
      //       {
      //         message: '테스크가 생성되었습니다.',
      //       },
      //     ];
      //   });
      // });
      //스프린트 생성 미완성
      //cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '스프린트 생성에 성공했습니다.');
    });
  });

  context('할일 추가 버튼을 누를경우', () => {
    beforeEach(() => {
      cy.get(
        '[data-row-key="0"] > .ant-table-cell-fix-left > [style="display: flex; justify-content: space-between; align-items: center;"] > .ant-btn'
      ).click();
    });

    it('새 하위 작업 생성 모달이 표시되어야 한다.', () => {
      cy.get('.ant-modal-content').should('be.visible');
      cy.get('[placeholder="하위 작업 명"]').should('be.visible');
      cy.get('[placeholder="하위 작업 설명"]').should('be.visible');
      cy.get('.ant-modal-footer > .ant-btn-default').should('have.text', 'Cancel');
      cy.get('.ant-btn-primary').should('have.text', 'OK');
    });

    it('생성에 실패할 경우 에러 메시지가 상단에 보여야 한다.', () => {
      cy.get('.ant-btn-primary').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '하위작업 생성에 실패했습니다.');
    });

    it('생성에 성공한 경우 성공 메시지가 상단에 보여야 한다.', () => {
      cy.get('[placeholder="하위 작업 명"]').type('테스트');
      cy.get('[placeholder="하위 작업 설명"]').type('테스트 입니다.');
      cy.get('.ant-btn-primary').click();
    });
  });
});
