Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createBlog', (content) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: content,
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

describe('template spec', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ashley Howard',
      username: 'ahoward',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      name: 'Test User',
      username: 'test',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.login({ username: 'ahoward', password: 'secret' })

    const newBlog2 = {
      title: 'Howdy Hoe Neighbourino',
      author: 'Ned Flanders',
      url: 'http://www.nedflandersacademy.com/howdy_hoe_neighbourino_blog.html',
      likes: 2
    }

    cy.createBlog(newBlog2)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs App')
  })

  it('login form is shown', function() {
    cy.contains('username:')
    cy.contains('password:')
  })

  describe('Login', function() {
    it('login fails', function(){
      cy.get('#username').type('tes')
      cy.get('#password').type('secre')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain','invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style','solid')
    })

    it('user can login', function() {
      cy.contains('username:')
      cy.contains('password:')
      cy.get('#username').type('test')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.get('.good')
        .should('contain','has logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style','solid')
    })
  })

  describe('When logged in', function() {
    it('A blog can be created by user', function() {
      cy.contains('username:')
      cy.contains('password:')
      cy.get('#username').type('test')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('new blog').click()
      cy.contains('title')
      cy.contains('author')
      cy.contains('url')

      cy.get('#titleinput').type('Five ways to cook with oranges and lemons this winter')
      cy.get('#authorinput').type('Patrick Wright')
      cy.get('#urlinput').type('https://www.abc.net.au/everyday/what-to-cook-oranges-and-lemons-winter-recipes/102683482')

      cy.get('#blog-submit-button').click()

      cy.contains('Five ways to cook with oranges and lemons this winter - Patrick Wright')
    })

    it('Users can like a blog', function() {
      cy.contains('username:')
      cy.contains('password:')
      cy.get('#username').type('test')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.wait(1000)

      cy.contains('new blog').click()

      cy.contains('title')
      cy.contains('author')
      cy.contains('url')

      cy.get('#titleinput').type('Five ways to cook with oranges and lemons this winter')
      cy.get('#authorinput').type('Patrick Wright')
      cy.get('#urlinput').type('https://www.abc.net.au/everyday/what-to-cook-oranges-and-lemons-winter-recipes/102683482')

      cy.get('#blog-submit-button').click()
      cy.wait(3500)
      cy.contains('cancel').click()

      cy.contains('div','Five ways to cook with oranges and lemons this winter').parent().as('workingBlog')
      cy.get('@workingBlog').contains('view').click()
      cy.wait(1000)
      cy.contains('div','Howdy Hoe Neighbourino').parent().as('workingBlog2')
      cy.get('@workingBlog2').contains('button','view').click()
      cy.wait(1000)
      cy.contains('div','Five ways to cook with oranges and lemons this winter').parent().as('workingBlog3')
      cy.get('@workingBlog3').contains('button','like').click()
    })

    it('Users can delete a blog', function() {
      cy.contains('username:')
      cy.contains('password:')
      cy.get('#username').type('test')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.wait(1000)

      cy.contains('new blog').click()

      cy.contains('title')
      cy.contains('author')
      cy.contains('url')

      cy.get('#titleinput').type('Five ways to cook with oranges and lemons this winter')
      cy.get('#authorinput').type('Patrick Wright')
      cy.get('#urlinput').type('https://www.abc.net.au/everyday/what-to-cook-oranges-and-lemons-winter-recipes/102683482')

      cy.get('#blog-submit-button').click()
      cy.wait(3500)
      cy.contains('cancel').click()

      cy.contains('div','Five ways to cook with oranges and lemons this winter').parent().as('workingBlog')
      cy.get('@workingBlog').contains('view').click()

      cy.contains('div','Five ways to cook with oranges and lemons this winter').parent().as('workingBlog2')
      cy.get('@workingBlog2').contains('delete').click()
    })

    it('Users can only see a blog delete button for the blog theyve made', function() {
      cy.contains('username:')
      cy.contains('password:')
      cy.get('#username').type('test')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.wait(1000)

      cy.contains('new blog').click()

      cy.contains('title')
      cy.contains('author')
      cy.contains('url')

      cy.get('#titleinput').type('Five ways to cook with oranges and lemons this winter')
      cy.get('#authorinput').type('Patrick Wright')
      cy.get('#urlinput').type('https://www.abc.net.au/everyday/what-to-cook-oranges-and-lemons-winter-recipes/102683482')

      cy.get('#blog-submit-button').click()
      cy.wait(3500)
      cy.contains('cancel').click()

      cy.contains('div','Howdy Hoe Neighbourino').parent().as('workingBlog')
      cy.get('@workingBlog').contains('view').click()

      cy.contains('div','Howdy Hoe Neighbourino').parent().as('workingBlog2')
      cy.get('@workingBlog2').contains('delete').should('not.exist')
    })

    it('Ensure most popular blog is at the top of the list', function() {
      cy.contains('username:')
      cy.contains('password:')
      cy.get('#username').type('test')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.wait(1000)

      cy.contains('new blog').click()

      cy.contains('title')
      cy.contains('author')
      cy.contains('url')

      cy.get('#titleinput').type('Five ways to cook with oranges and lemons this winter')
      cy.get('#authorinput').type('Patrick Wright')
      cy.get('#urlinput').type('https://www.abc.net.au/everyday/what-to-cook-oranges-and-lemons-winter-recipes/102683482')

      cy.get('#blog-submit-button').click()
      cy.wait(3500)
      cy.contains('cancel').click()

      cy.get('.blog').eq(0).should('contain', 'Howdy Hoe Neighbourino')
      cy.get('.blog').eq(1).should('contain', 'Five ways to cook with oranges and lemons this winter')

      cy.contains('div','Five ways to cook with oranges and lemons this winter').parent().as('workingBlog2')
      cy.get('@workingBlog2').contains('view').click()

      cy.wait(1000)
      cy.contains('div','Five ways to cook with oranges and lemons this winter').parent().as('workingBlog3')
      cy.get('@workingBlog3').contains('button','like').click()
      cy.wait(1000)
      cy.contains('div','Five ways to cook with oranges and lemons this winter').parent().as('workingBlog3')
      cy.get('@workingBlog3').contains('button','like').click()
      cy.wait(1000)
      cy.contains('div','Five ways to cook with oranges and lemons this winter').parent().as('workingBlog3')
      cy.get('@workingBlog3').contains('button','like').click()
      cy.wait(1000)
      cy.contains('div','Five ways to cook with oranges and lemons this winter').parent().as('workingBlog3')
      cy.get('@workingBlog3').contains('button','like').click()
      cy.wait(1000)
      cy.contains('div','Five ways to cook with oranges and lemons this winter').parent().as('workingBlog3')
      cy.get('@workingBlog3').contains('button','like').click()
      cy.wait(1000)

      cy.get('.blog').eq(0).should('contain', 'Five ways to cook with oranges and lemons this winter')
      cy.get('.blog').eq(1).should('contain', 'Howdy Hoe Neighbourino')

    })
  })
})