const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const LoginPage = require('../pages/login_page');
const Dashboard = require('../pages/dashboard_page');
const Posts = require('../pages/posts_page');

let loginPage;
let dashboard;
let posts;

When('I login ghost {kraken-string} and {kraken-string}', async function (email, password) {
  loginPage = new LoginPage(this.driver);
  await loginPage.enterEmail(email);
  await loginPage.enterPassword(password);
  await loginPage.clickSignInButton();
});

Then('the URL should be dashboard {kraken-string}', async function (expectedUrl) {
  const currentUrl = await loginPage.getCurrentUrl();
  assert.strictEqual(currentUrl, expectedUrl, 'URL did not match the expected URL');
});

When('I click posts', async function () {
  dashboard = new Dashboard(this.driver);
  await dashboard.clickPostsButton();
})

Then('the URL should be posts {kraken-string}', async function (expectedUrl) {
  const currentUrl = await dashboard.getCurrentUrl();
  assert.strictEqual(currentUrl, expectedUrl, 'URL did not match the expected URL');
})

When('I click new post', async function () {
  posts = new Posts(this.driver);
  await posts.clickNewPostButton();
})

When('I create a new post', async function () {
  await posts.enterTittle('test tittle');
  await posts.enterContent('test content');
})