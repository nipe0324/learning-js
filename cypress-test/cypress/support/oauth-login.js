// OAuth経由でログインする関数
export function loginViaOAuth(provider) {
  switch (provider) {
    case 'google':
      loginToGoogle(
        // cypress.env.json に設定したGoogleのログイン情報を使う
        Cypress.env('GOOGLE_USERNAME'),
        Cypress.env('GOOGLE_PASSWORD')
      );
      break;
      // NOTE: ここに他のプロバイダーの認証を追加できる
    default:
      throw new Error('no provider configured!');
  }
}

// Googleログイン用の関数
function loginToGoogle(username, password) {
  Cypress.on(
    'uncaught:exception',
    (err) =>
      !err.message.includes('ResizeObserver loop') &&
      !err.message.includes('Error in protected function')
  );

  cy.visit(Cypress.env('BASE_URL'));

  cy.get('#qsLoginBtn').click();

  // Auth0のログインページでGoogleボタンをクリック
  // doc: https://docs.cypress.io/api/commands/origin
  cy.origin(Cypress.env('AUTH0_DOMAIN'), () => {
    cy.scrollTo('bottom');
    cy.get('form[data-provider="google"]').submit();
  });

  // Googleのログインページでユーザー名とパスワードを入力
  // doc: https://docs.cypress.io/api/commands/origin
  cy.origin(
    'https://accounts.google.com',
    {
      args: {
        username,
        password,
      },
    },
    ({ username, password }) => {
      Cypress.on(
        'uncaught:exception',
        (err) =>
          !err.message.includes('ResizeObserver loop') &&
          !err.message.includes('Error in protected function')
      );

      cy.get('input[type="email"]').type(username, { log: false });
      // NOTE: 要素はフォームに存在するが、非表示になって再レンダリングされるためwait()を追加
      cy.contains('次へ').click().wait(4000);

      cy.get('[type="password"]').type(password, { log: false });
      cy.contains('次へ').click().wait(4000);
    }
  );

  // ログイン時に表示されるプロフィールドロップダウンが存在することを確認
  cy.get('#profileDropDown').should('exist');
}
