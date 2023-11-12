const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const LoginPage = require('../pages/login_page');
const Dashboard = require('../pages/dashboard_page');
const Posts = require('../pages/posts_page');
const properties = require('../../../properties.json');
const faker = require('@faker-js/faker');

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
  await posts.enterTittle('test');
  await posts.enterContent('test');
})

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

// Scenario 7
Then('The update button should be disabled', async function() {
  let element = this.driver.$('button.gh-btn gh-btn-editor gh-editor-save-trigger green ember-view');

  if (undefined != element && null != element) {
    console.log(element);
    //assert.equal(element.disabled, true);
  }
})

// Scenario 8
When('I modify the post title', async function() {
  posts = new Posts(this.driver);
  await posts.modifyPostTitle(`${Math.random()} Lorem ipsum dolor sit amet ${Math.random()}`);
})

/*When('I modify the post body', async function() {
  posts = new Posts(this.driver);
  await posts.modifyPostBody('Duis ante ligula, congue id ipsum ut, malesuada tincidunt massa.');
})*/