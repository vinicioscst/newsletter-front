/// <reference types="cypress" />

describe('dashboard page', () => {
  beforeEach(() => {
    cy.intercept('POST', `${Cypress.env('BASE_URL')}/api/login`).as(
      'loginRequest'
    )
    cy.visit('http://localhost:8000/login')

    const email = Cypress.env('EMAIL')
    const password = Cypress.env('PASSWORD')

    cy.dashboardLogin(email, password)

    cy.wait('@loginRequest')
  })

  context('data', () => {
    it('renders articles data', () => {
      cy.intercept(
        'GET',
        `${Cypress.env(
          'BASE_URL'
        )}/api/articles?page=1&perPage=4&search=&orderBy=MaisRecente`
      ).as('getArticles')
      cy.intercept('GET', `${Cypress.env('BASE_URL')}/api/articles/topics`).as(
        'getTopics'
      )

      cy.wait('@getArticles').then((interception) => {
        expect(interception.response.statusCode).to.eq(200)
        cy.log(interception.response.body)
      })

      cy.wait('@getTopics').then((interception) => {
        expect(interception.response.statusCode).to.eq(200)
        cy.log(interception.response.body)
      })
    })

    it('renders user name on dashboard', () => {
      cy.get('[data-test=dashboard-username]')
        .should('exist')
        .and('contain.text', Cypress.env('NAME'))
    })
  })

  context('pagination', () => {
    it('works', () => {
      cy.log('Oi!')
    })
  })

  context('navigation', () => {
    it('goes to settings page', () => {
      cy.get('[data-test=settings-button]').click()
      cy.get('[data-test=menu-settings-button]').click()
      cy.location('pathname').should('include', 'settings')
    })

    it('goes to login page when logging out', () => {
      cy.get('[data-test=settings-button]').click()
      cy.get('[data-test=menu-logout-button]').click()
      cy.wait(2000)
      cy.location('pathname').should('include', 'login')
    })

    it('removes cookies when logging out', () => {
      cy.get('[data-test=settings-button]').click()
      cy.get('[data-test=menu-logout-button]').click()
      cy.wait(2000)
      cy.getCookies().should('be.empty')
    })
  })

  context('settings', () => {
    beforeEach(() => {
      cy.get('[data-test=settings-button]').click()
      cy.get('[data-test=menu-settings-button]').click()
    })

    it('renders preview user info', () => {
      cy.wait(1000)
      cy.get('[data-test=edit-name-input]').should(
        'contain.value',
        Cypress.env('NAME')
      )
      cy.get('[data-test=edit-email-input]').should(
        'contain.value',
        Cypress.env('EMAIL')
      )
    })

    it('edits user correctly', () => {
      cy.intercept(
        'PATCH',
        `${Cypress.env('BASE_URL')}/api/user/${Cypress.env('USER_ID')}`
      ).as('editUserRequest')

      cy.wait(1000)

      cy.editUser('Teste Edição', 'editado@mail.com')

      cy.wait('@editUserRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })

      cy.intercept(
        'PATCH',
        `${Cypress.env('BASE_URL')}/api/user/${Cypress.env('USER_ID')}`
      ).as('secondEditUserRequest')

      const userName = Cypress.env('NAME')
      const userEmail = Cypress.env('EMAIL')

      cy.editUser(userName, userEmail)

      cy.wait('@secondEditUserRequest').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
    })

    it('edits user with invalid type', () => {
      cy.get('[data-test=edit-email-input]').clear().type('Teste Email')
      cy.get('[data-test=edit-email-input]').clear().type('Teste Email')
      cy.get('.v-messages__message').should(
        'contain.text',
        'Insira um email válido'
      )
      cy.get('[data-test=edit-user-button]').should('be.disabled')
    })
  })
})
