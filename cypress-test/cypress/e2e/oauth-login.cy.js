describe('Google Login Demo', () => {
  beforeEach(() => {
    // GoogleのOAuth認証を実施
    cy.loginViaOAuth('google')
  })

  it('shows logged in user profile page', () => {
    cy.visit('http://localhost:3000/profile')
    cy.location('pathname').should('eq', '/profile')
    cy.contains(Cypress.env('GOOGLE_USERNAME')).should('exist')
  })
})
