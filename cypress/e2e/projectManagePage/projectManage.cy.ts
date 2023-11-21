describe('프로젝트 관리 페이지 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '**/members/info', {
      fixture: 'memberInfo.json',
    }).as('MemberInfo');
    cy.intercept('GET', '**/projects/5', {
      fixture: 'projectInfo.json',
    }).as('ProjectInfo');
    cy.visit(`http://localhost:3000/projects/5/manage`);
  });

  context('프로젝트 관리 페이지에 들어온 경우', () => {
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

    it('프로젝트 관리 페이지에 존재 하는 문구들이 있어야 한다.', () => {
      cy.get('.css-ewbcqp > :nth-child(1)').should('have.text', '프로젝트 정보');
      cy.get('.css-12zyx3n > :nth-child(1) > :nth-child(1)').should('have.text', '프로젝트 이름');
      cy.get('.css-12zyx3n > :nth-child(1) > :nth-child(2)').should('have.text', 'Awesome project');
      cy.get('.css-12zyx3n > :nth-child(2) > :nth-child(1)').should('have.text', '프로젝트 설명');
      cy.get('.css-12zyx3n > :nth-child(2) > :nth-child(2)').should('have.text', '으썸한 프로젝트 설명');
    });

    it('프로젝트 관리 페이지에 존재 하는 버튼들이 있어야 한다.', () => {
      cy.get('.css-ewbcqp > :nth-child(2) > .ant-btn').should('be.visible');
      cy.get('[style="color: black; background-color: white; border: 1px;"]').should('be.visible');
      cy.get('[style="color: white;"]').should('be.visible');
      cy.get(':nth-child(3) > .ant-btn-default').should('be.visible');
    });

    it('프로젝트 정보 페이지에 구성원들의 정보가 들어가야한다.', () => {
      cy.get(':nth-child(1) > .css-1ex1afd-MuiTableCell-root').should('have.text', 'exAdmin');
      cy.get(':nth-child(1) > [style="width: 300px;"]').should('have.text', 'example1@gmail.com');
      cy.get(':nth-child(1) > [style="width: 160px; padding-right: 16px;"]').should('have.text', '관리자');
      cy.get(':nth-child(2) > .css-1ex1afd-MuiTableCell-root').should('have.text', 'exMem');
      cy.get(':nth-child(2) > [style="width: 300px;"]').should('have.text', 'example2@gmail.com');
      cy.get(':nth-child(2) > [style="width: 160px; padding-right: 16px;"]').should('have.text', '멤버');
      cy.get(':nth-child(3) > .css-1ex1afd-MuiTableCell-root').should('have.text', 'exViewer');
      cy.get(':nth-child(3) > [style="width: 300px;"]').should('have.text', 'example3@gmail.com');
      cy.get(':nth-child(3) > [style="width: 160px; padding-right: 16px;"]').should('have.text', '방문자');
      cy.get(':nth-child(4) > .css-1ex1afd-MuiTableCell-root').should('have.text', 'exInvited');
      cy.get(':nth-child(4) > [style="width: 300px;"]').should('have.text', 'example4@gmail.com');
      cy.get(':nth-child(4) > [style="width: 160px; padding-right: 16px;"]').should('have.text', '초대된 사람');
      cy.get(':nth-child(5) > .css-1ex1afd-MuiTableCell-root').should('have.text', 'exLeft');
      cy.get(':nth-child(5) > [style="width: 300px;"]').should('have.text', 'example5@gmail.com');
      cy.get(':nth-child(5) > [style="width: 160px; padding-right: 16px;"]').should('have.text', '추방된 사람');
    });
  });

  context('프로젝트 정보 수정을 할 경우', () => {
    beforeEach(() => {
      cy.get('.css-ewbcqp > :nth-child(2) > .ant-btn').click();
    });
    it('모달에 존재하는 문구들이 있어야 한다.', () => {
      cy.get('[placeholder="Awesome project"]').should('be.visible');
      cy.get('[placeholder="으썸한 프로젝트 설명"]').should('be.visible');
      cy.get('.ant-modal-footer > div > .ant-btn').should('be.visible');
    });

    it('인풋창에 텍스트를 입력하면 입력이 되어야 한다.', () => {
      cy.get('[placeholder="Awesome project"]')
        .type('수정될 프로젝트 제목')
        .should('have.value', '수정될 프로젝트 제목');
      cy.get('[placeholder="으썸한 프로젝트 설명"]')
        .type('수정될 프로젝트 설명')
        .should('have.value', '수정될 프로젝트 설명');
    });
  });

  context('프로젝트에 멤버를 추가 할 경우', () => {
    beforeEach(() => {
      cy.get('[style="color: black; background-color: white; border: 1px;"]').click();
    });
    it('모달에 존재하는 문구가 있어야 한다.', () => {
      cy.get('.ant-modal-body > p').should('be.visible');
      cy.get('.ant-input').should('be.visible');
      cy.get('[style="display: flex; flex-direction: column; gap: 1rem;"] > .ant-btn').should('be.visible');
      cy.get('.ant-modal-footer > .ant-btn').should('be.visible');
    });

    it('인풋창에 멤버 이메일을 입력 후 추가 버튼을 누르면 추가가 되어야 한다.', () => {
      cy.get('.ant-input').type('example6@gmail.com').should('have.value', 'example6@gmail.com');
      cy.get('[style="display: flex; flex-direction: column; gap: 1rem;"] > .ant-btn').click();
      cy.get('[style="display: flex; justify-content: space-between; align-items: center;"]').should(
        'have.text',
        'example6@gmail.com'
      );
      cy.get('.ant-modal-footer > .ant-btn').click();
      // cy.get('.Toastify__toast-body > :nth-child(2) > div').should('have.text', '초대에 성공하였습니다.');
    });
  });

  context('프로젝트를 삭제 할 경우', () => {
    it('프로젝트 삭제 버튼을 누르면 삭제가 되어야한다.', () => {
      cy.get(':nth-child(3) > .ant-btn-default').click();
      // cy.get('.Toastify__toast-body > :nth-child(2) > div').should('have.text', '삭제되었습니다.');
    });
  });
});
