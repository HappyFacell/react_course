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
  it('Login form is shown', function() {
    cy.get('#login-form').should('be.visible')

    cy.get('#login-form #username').should('be.visible')
    cy.get('#login-form #password').should('be.visible')
    cy.get('#login-form #login-button').should('be.visible')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Test')
      cy.get('#password').type('Test')

      cy.get('#login-button').click()
      cy.contains('Test logged-in')
    })

    
  })

  describe('when logged-in', function () {
    beforeEach(function() {
      cy.login({ username: 'Test', password: 'Test' })
      
    })
    
    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('this title is created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')

      cy.contains('create').click()
      cy.contains('this title is created by cypress cypress')
    })

  describe('and several blogs exist', function(){
    beforeEach(function(){
      const user = {
        username: 'Test2',
        name: 'Test2',
        password: 'Test2'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)


      cy.createBlog({ title: 'first blog', author: 'cypress', url: "http://cypress.com"})
      cy.createBlog({ title: 'second blog', author: 'cypress', url: "http://cypress.com"})
      cy.createBlog({ title: 'third blog', author: 'cypress', url: "http://cypress.com"})
    })

    it('one of those can be liked', function(){
      cy.contains('second blog').parent().find('button').as('theButton')
      cy.get('@theButton').click()

      cy.get('.btnLikes').click()

      cy.contains('likes:').should('contain', 'likes: 1')
    })

    it('A user that created a blog can be deleted', function(){
      cy.contains('third blog').parent().find('button').as('theButton')
      cy.get('@theButton').click()

      cy.get('.btnRemove').click()
    })

    it('And another user cant be deleted a blog', function() {
      cy.contains('logout').click()
      cy.login({ username: 'Test2', password: 'Test2' })

      cy.contains('third blog').parent().find('button').as('theButton')
      cy.get('@theButton').click()

      cy.get('.btnRemove').should('not.exist')
    })

    it('The blog with most likes it is in the top', function() {
      cy.get('.blog').eq(0).should('contain', 'first blog')
      cy.get('.blog').eq(1).should('contain', 'second blog')
      cy.get('.blog').eq(2).should('contain', 'third blog')

      cy.contains('second blog').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.get('.btnLikes').click()
      cy.contains('likes:').should('contain', 'likes: 1')
      cy.get('.btnLikes').click()
      cy.contains('likes:').should('contain', 'likes: 2')
      cy.get('.btnLikes').click()
      cy.contains('likes:').should('contain', 'likes: 3')
      cy.contains('hide').click()
      
      
      
      cy.contains('first blog').parent().find('button').as('theButton2')
      cy.get('@theButton2').click()
      cy.get('.btnLikes').click()
      cy.contains('likes:').should('contain', 'likes: 1')
      cy.contains('hide').click()

      cy.contains('third blog').parent().find('button').as('theButton3')
      cy.get('@theButton3').click()
      cy.get('.btnLikes').click()
      cy.contains('likes:').should('contain', 'likes: 1')
      cy.get('.btnLikes').click()
      cy.contains('likes:').should('contain', 'likes: 2')
      cy.get('.btnLikes').click()
      cy.contains('likes:').should('contain', 'likes: 3')
      cy.get('.btnLikes').click()

      cy.contains('likes:').should('contain', 'likes: 4')
      cy.get('.blog').eq(2).should('contain', 'first blog')
      cy.get('.blog').eq(1).should('contain', 'second blog')
      cy.get('.blog').eq(0).should('contain', 'third blog')

    })


  })


})

it('fails with wrong credentials', function() {
  cy.get('#username').type('test')
  cy.get('#password').type('testt')

  cy.get('#login-button').click()

  cy.get('div.error')
    .should('contain', 'Wrong username or password')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')

  cy.get('html').should('not.contain', 'Test logged-in')
})

})