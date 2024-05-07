describe('TodoMVC', () => {
  it('should add a new todo item', () => {
    cy.visit('https://demo.playwright.dev/todomvc/');

    cy.get('.new-todo').type('寝る前に歯を磨く{enter}');

    cy.get('[data-testid="todo-title"]').contains('寝る前に歯を磨く').should('exist');
  });
});
