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
      cy.get('[data-test=article-preview-modal]').should('exist')
      cy.get('[data-test=article-preview-modal]').should('be.visible')
    })
  })

  context('filter and ordening', () => {
    //
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

describe('login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/login')
  })

  context('validation', () => {
    it('verifies if form has empty field(s) before submitting 1/3', () => {
      cy.get('div .error--text').should('not.exist')
      cy.get('[data-test=login-form-button]').click()
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })

    it('verifies if form has empty field(s) before submitting 2/3', () => {
      cy.get('[data-test=login-form-email]').type('meuemail@ht.com')
      cy.get('div .error--text').should('not.exist')
      cy.get('[data-test=login-form-button]').click()
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })

    it('verifies if form has empty field(s) before submitting 3/3', () => {
      cy.get('[data-test=login-form-password]').type('minhasenha')
      cy.get('div .error--text').should('not.exist')
      cy.get('[data-test=login-form-button]').click()
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })

    it('verifies if form has invalid value', () => {
      cy.get('[data-test=login-form-email]').type('meuemail@com')
      cy.get('div .error--text').should('exist')
      cy.get('[data-test=login-form-button]').should('be.disabled')
    })
  })
})
