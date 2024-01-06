describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'Test',
      name: 'Test',
      password: 'Test'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })
  // it('Login form is shown', function() {
  //   cy.get('#login-form').should('be.visible')

  //   cy.get('#login-form #username').should('be.visible')
  //   cy.get('#login-form #password').should('be.visible')
  //   cy.get('#login-form #login-button').should('be.visible')
  // })

  // describe('Login', function() {
  //   it('succeeds with correct credentials', function() {
  //     cy.get('#username').type('Test')
  //     cy.get('#password').type('Test')

  //     cy.get('#login-button').click()
  //     cy.contains('Test logged-in')
  //   })

    
  // })

  describe('when logged-in', function () {
    beforeEach(function() {
      // cy.login({ username: 'Test', password: 'Test' })


      cy.request('POST', 'http://localhost:3003/api/login', 
      { username: 'Test', password: 'Test' })
      .then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')    })

      // cy.get('#username').type('Test')
      // cy.get('#password').type('Test')

      // cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
    })
  })


  // it('fails with wrong credentials', function() {
  //   cy.get('#username').type('Test2')
  //   cy.get('#password').type('Test2')

  //   cy.get('#login-button').click()

  //   cy.get('div.error')
  //     .should('contain', 'Wrong username or password')
  //     .and('have.css', 'color', 'rgb(255, 0, 0)')
  //     .and('have.css', 'border-style', 'solid')

  //   cy.get('html').should('not.contain', 'Test logged-in')
  // })
})