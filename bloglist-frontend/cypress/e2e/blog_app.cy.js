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

  describe('Login', () => {
    it('succeeds with correct credentials', function() {
      cy.get('input#username').type('mike-wazowski')
      cy.get('input#password').type('password')
      cy.get('button#login-button').click()
      cy.contains(`Michel Philippe Edubas logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('input#username').type('mike-wazowski')
      cy.get('input#password').type('wrongpassword')
      cy.get('button#login-button').click()
      cy.contains(`Wrong Credentials`)
        .should('have.css', 'color')
        .and('eq', 'rgb(255, 0, 0)');
    })
  })
  
  describe.only('When logged in', function() {
    beforeEach(function () {
      cy.get('input#username').type('mike-wazowski')
      cy.get('input#password').type('password')
      cy.get('button#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('input#title').type('How to get away with murder')
      cy.get('input#author').type('Michel Kalinky')
      cy.get('input#url').type('www.link.com')
      cy.get('button#addBlog-button').click()
      cy.get('.blog')
        .contains('How to get away with murder')
      cy.get('.blog')
        .contains('Michel Kalinky')
      cy.get('.blog')
        .contains('www.link.com')
    })

    describe('Where there are blogs rendered', function() {
      beforeEach(function() {
        cy.contains('New Blog').click()
        cy.get('input#title').type('How to get away with murder')
        cy.get('input#author').type('Michel Kalinky')
        cy.get('input#url').type('www.link.com')
        cy.get('button#addBlog-button').click()
      })

      it('User can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('User can delete a blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
      })
    })
  })
})
