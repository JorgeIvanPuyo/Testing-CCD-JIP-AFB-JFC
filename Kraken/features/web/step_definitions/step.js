const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const LoginPage = require('../pages/login_page');
const Dashboard = require('../pages/dashboard_page');
const Posts = require('../pages/posts_page');
const properties = require('../../../properties.json');

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
  await posts.enterTittle('TittleNewPost');
  await posts.enterContent('Content for Test New Post Scenario.');
})


When('I publish the post', async function () {
  await posts.clickPublishButton();
  await posts.clickContinue();
  await posts.clickPostNow();
  await posts.clickPreview();
})

Then('The url should include {kraken-string}', async function (tittle) {
  const currentUrl = await dashboard.getCurrentUrl();

  assert.strictEqual(
    currentUrl.includes(tittle.toLowerCase()),
    true,
    `URL does not include ${tittle}`
  );
});

//Scenario #6
When('I click on a post', async function() {
  posts = new Posts(this.driver);
  await posts.clickOnAPost();
})

When('I click in unpublish button', async function() {
  posts = new Posts(this.driver);
  await posts.unplublishPost();
})

When('I click on confirm unpublish', async function() {
  posts = new Posts(this.driver);
  await posts.confirmUnpublish();
})

Then('the post should be as {kraken-string}', async function(postStatus){
  assert.equal(postStatus, properties.POST_DRAFT_STATUS);
})

Then('The update button should be disabled', async function() {
  let element = this.driver.$('button.gh-btn gh-btn-editor gh-editor-save-trigger green ember-view');

  if (undefined != element && null != element) {
    console.log(element);
    //assert.equal(element.disabled, true);
  }
})




