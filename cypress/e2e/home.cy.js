/// <reference types="cypress" />

describe('home', () => {
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
