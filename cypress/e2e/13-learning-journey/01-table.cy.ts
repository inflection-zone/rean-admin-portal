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
      cy.contains('Educational').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Learning-Journeys').click()
      cy.wait(2000)
      cy.contains('→').scrollIntoView()
      cy.wait(2000)
      cy.contains('→').click()
      cy.wait(2000)
      cy.contains('←').click()
      cy.wait(2000)
      cy.get('select').select('20')
      cy.wait(2000)
      cy.get('select').select('10')
      cy.wait(2000)
      cy.get(':nth-child(1) > .relative > .input').scrollIntoView()
      cy.wait(2000)
      cy.get(':nth-child(1) > .relative > .input').type('vrv')
      cy.wait(2000)
      cy.get('.lg\\:w-20').click()
      cy.wait(2000)
      cy.get(':nth-child(1) > .relative > .input').clear()
      cy.wait(2000)
      cy.get(':nth-child(2) > .relative > .input').type('65')
      cy.wait(2000)
      cy.get('.lg\\:w-20').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > .relative > .input').clear()
    })
	});
 

