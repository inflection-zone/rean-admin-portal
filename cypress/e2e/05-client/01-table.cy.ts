/// <reference types="cypress" />

import login from '../pageObjects/login/login-test';

describe('test', () => {
	it.only('LoginTest', function () {
		cy.visit('http://localhost:5173/');

		cy.fixture('login').then((data) => {
			const ln = new login();
      cy.wait(3000)
			ln.setUserName(data.username);
			ln.setPassword(data.password);
			ln.clickLogin();
		});
    cy.wait(3000)
      cy.get('.app-bar-slot-lead > .flex').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Client').click()
      // cy.wait(2000)
      // cy.get('[data-testid="drawer-backdrop"]').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(5) > a > .svelte-fa').click()
      cy.wait(2000)
      cy.get('input[name=clientName]').clear()
      cy.wait(2000)
      cy.get('input[name=clientName]').type('nghbgf')
      cy.wait(2000)
      cy.get('input[name=password]').clear()
      cy.wait(2000)
      cy.get('input[name=password]').type('btgrgbvfv')
      cy.wait(2000)
      cy.get('input[name=phone]').clear()
      cy.wait(2000)
      cy.get('input[name=phone]').type('9798674563')
      cy.wait(2000)
      cy.get('input[name=email]').clear()
      cy.wait(2000)
      cy.get('input[name=email]').type('def@gmail.com')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.get(':nth-child(1) > .text-primary-primary-500').click()
      cy.wait(2000)
      // cy.contains('→').scrollIntoView()
      // cy.wait(2000)
      // cy.contains('→').click()
      // cy.wait(2000)
      // cy.contains('←').click()
      // cy.wait(2000)
      // cy.get('select').select('20')
      // cy.wait(2000)
      // cy.get('select').select('10')
      // cy.wait(2000)
      // cy.get(':nth-child(1) > .relative > .input').scrollIntoView()
      // cy.wait(2000)
      cy.get(':nth-child(1) > .relative > .input').type('nghbgf')
      cy.wait(2000)
      cy.get('.lg\\:w-20').click()
      cy.wait(2000)
      cy.get(':nth-child(1) > .relative > .input').clear()
      cy.wait(2000)
      cy.get(':nth-child(2) > .relative > .input').type('dev@excell-medicos.com')
      cy.wait(2000)
      cy.get('.lg\\:w-20').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > .relative > .input').clear()
    })
	});
 

