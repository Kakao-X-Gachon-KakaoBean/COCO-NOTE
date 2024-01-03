describe('릴리즈 노트 원고 생성 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', {
      fixture: 'projectContents.json',
    }).as('ProjectList');
    cy.intercept('GET', '/manuscripts?projectId=5', {
      fixture: 'manuscriptTree.json',
    }).as('manuscriptTree');
    cy.intercept('GET', '/release-notes?projectId=5', {
      fixture: 'releasenoteTree.json',
    }).as('releasenoteTree');
    cy.intercept('GET', '/release-notes/page?projectId=5&page=0', {
      fixture: 'releasenoteAllPage0.json',
    }).as('releasenoteAll0');
    cy.intercept('GET', '/release-notes/page?projectId=5&page=1', {
      fixture: 'releasenoteAllPage1.json',
    }).as('releasenoteAll1');
    cy.intercept('POST', '/manuscripts', {
      fixture: 'createManuscript.json',
    }).as('createManuscript');
    cy.visit(`/projects/5/release-notes`);
    return cy.fixture('manuscriptTree.json').then(manuscripts => {
      // 생성된 원고를 추가하기 전 초기화
      manuscripts.manuscripts = manuscripts.manuscripts.slice(0, 2);
      cy.writeFile('cypress/fixtures/manuscriptTree.json', manuscripts);
    });
  });

  context('릴리즈 노트 전체 페이지에 들어온 경우', () => {
    it('사이드 바에 해당하는 문구가 존재해야한다.', () => {
      cy.get('.selected').should('be.visible');
      cy.get('.selected > .css-1a1tdkp').should('have.text', 'Awesome project');
      cy.get(':nth-child(2) > .notSelected > .css-1a1tdkp').should('have.text', 'kakaoBean Project');
      cy.get('.css-gkszvj > .css-1a1tdkp').should('have.text', '+');
    });

    it('세부 사이드 바에 존재 하는 문구가 있어야 한다.', () => {
      cy.get('.selected > .css-1a1tdkp').should('have.text', 'Awesome project');
      cy.get(':nth-child(2) > .css-1eid011 > .css-1m0b3tt').should('have.text', '릴리즈 노트');
      cy.get(
        ':nth-child(1) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(1) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '수정 중인 릴리즈 노트');
      cy.get(
        ':nth-child(1) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(2) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '2.6V');
      cy.get('.ant-btn > span').should('have.text', '+');
      cy.get(
        ':nth-child(3) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(1) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '배포된 릴리즈 노트 목록');
      cy.get(
        ':nth-child(3) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(2) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '1.1V');
      cy.get(':nth-child(3) > .css-1eid011 > .css-1m0b3tt').should('have.text', '작업 관리');
      cy.get(':nth-child(4) > .css-1eid011 > .css-1m0b3tt').should('have.text', '이슈');
    });
  });
  context('릴리즈 노트 원고 수정 버튼을 클릭했을 경우', () => {
    it('생성된 모달에는 새로운 원고의 정보를 입력받을 수 있도록 구성되어 있어야 한다.', () => {
      cy.get('.ant-btn > span').click();
      cy.get('.ant-modal-content').should('exist');
      cy.get(':nth-child(1) > .ant-input').should('exist');
      cy.get(':nth-child(2) > .ant-input').should('exist');
      cy.get('.ant-modal-footer > .ant-btn > span').should('have.text', '생성');
    });
  });
  context('새 릴리즈 노트를 생성 성공할 경우', () => {
    it('릴리즈 노트 원고 생성 메시지를 확인할 수 있어야 한다.', () => {
      cy.get('.ant-btn > span').click();
      cy.get(':nth-child(1) > .ant-input').type('새로운 릴리즈 노트');
      cy.get(':nth-child(2) > .ant-input').type('2.8V');
      cy.get('.ant-modal-footer > .ant-btn').click();

      cy.wait('@createManuscript').then(() => {
        cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', '릴리즈 노트 생성에 성공했습니다.');
        cy.fixture('manuscriptTree.json').then(manuscripts => {
          const newManuscript = {
            id: 18,
            title: '새로운 릴리즈 노트',
            version: '2.8V',
          };
          manuscripts.manuscripts.push(newManuscript);
          cy.writeFile('cypress/fixtures/manuscriptTree.json', manuscripts);
        });
        cy.wait('@manuscriptTree');
      });
    });
    it('생성된 릴리즈 노트 원고를 확인할 수 있어야 한다.', () => {
      // manuscriptTree api 재실행해서 Tree 업데이트 확인
      cy.get(
        ':nth-child(1) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > :nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title'
      ).should('have.text', '2.8V');
    });
  });
});
