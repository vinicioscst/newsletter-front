/// <reference types="cypress" />

describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000')
  })

  context('responsiveness', () => {
    it('renders login button on desktop', () => {
      cy.get('[data-test=header-login-button]').should('be.visible')
      cy.get('[data-test=header-login-button-mobile]').should('not.be.visible')
    })

    it('renders login button on mobile', () => {
      cy.viewport(499, 595)
      cy.get('[data-test=header-login-button-mobile]').should('be.visible')
      cy.get('[data-test=header-login-button]').should('not.be.visible')
    })
  })

  context('articles', () => {
    it('renders articles cards', () => {
      cy.get('[data-test=articles-card]').should('have.length.above', 0)
    })

    it('renders articles topics', () => {
      cy.get('[data-test=articles-topics]').should('have.length.above', 0)
    })

    it('renders article modal on click', () => {
      cy.get('[data-test=article-preview-modal]').should('not.exist')
      cy.get('[data-test=card-button]').first().click()
      cy.get('[data-test=article-preview-modal]')
        .should('exist')
        .and('be.visible')
    })
  })

  context('search, filter and ordening', () => {
    it('search 1/3 - shows all articles when searching without text')
    it(
      'search 2/3 - shows no article message when searching for inexistent article or topic'
    )
    it('search 3/3 - shows correct article(s) when searching for it')
    it('order 1/2 - shows articles in alphabetical order')
    it('order 2/2 - orders articles by date')
    it('filter - show correct amount of articles')
  })

  context('navigation', () => {
    it('goes to login page when clicking button on desktop', () => {
      cy.get('[data-test=header-login-button]').should('be.visible')
      cy.get('[data-test=header-login-button]').click()
      cy.location('pathname').should('include', 'login')
    })

    it('goes to login page when clicking button on mobile', () => {
      cy.viewport(499, 595)
      cy.get('[data-test=header-login-button-mobile]').should('be.visible')
      cy.get('[data-test=header-login-button-mobile]').click()
      cy.location('pathname').should('include', 'login')
    })
  })
})
