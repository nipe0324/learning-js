const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // 妨害するサードパーティコードの変更を有効にする
  // https://docs.cypress.io/guides/guides/web-security#Modifying-Obstructive-Third-Party-Code
  experimentalModifyObstructiveThirdPartyCode: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
