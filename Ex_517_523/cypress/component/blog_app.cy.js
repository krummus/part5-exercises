describe('blog_app.cy.js', () => {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs App')
  })

  it('login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('username:')
    cy.contains('password:')
  })
})