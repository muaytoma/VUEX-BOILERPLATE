module.exports = {
  'login': function (browser) {
    browser
      .url('http://localhost:8080/login')
      .waitForElementVisible('.login', 1000)
      .assert.containsText('div', 'Demo')
      .end()
  }
}
