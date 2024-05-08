// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { loginViaOAuth } from './oauth-login';

Cypress.Commands.add('loginViaOAuth', (provider) => {
  cy.log(`loginViaOAuth : ${provider}`);

  // cy.sessionを使ってログイン情報をキャッシュ
  // Doc: https://docs.cypress.io/api/commands/session
  cy.session(`oauth-${provider}`,
    () => loginViaOAuth(provider),
    {
      // ログイン時のプロフィールドロップダウンが表示されていない場合
      // loginViaOAuth(provider) を実行する
      validate: () => {
        cy.visit(Cypress.env('BASE_URL'))
        cy.get('#profileDropDown').should('exist')
      },
    }
  );
});
