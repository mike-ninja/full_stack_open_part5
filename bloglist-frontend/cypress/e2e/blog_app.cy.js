describe('Blog App', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Michel Philippe Edubas',
      username: 'mike-wazowski',
      password: 'password'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to the application')
    cy.get('input#username').should('exist')
    cy.get('input#password').should('exist')
    cy.get('button#login-button').should('exist')
  })
})
