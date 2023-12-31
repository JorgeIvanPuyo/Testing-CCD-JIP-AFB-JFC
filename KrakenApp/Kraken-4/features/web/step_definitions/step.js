const { Given, When, Then, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../pages/login_page');
const Dashboard = require('../pages/dashboard_page');
const Posts = require('../pages/posts_page');
const properties = require('../../../properties.json');
const postsArray = require('../../../ghost-post.json');

let loginPage;
let dashboard;
let posts;
let members;
let count = 0;
let newCount = 0;
var postSelectedInDraftStatus = "";

// Variables para gestionar screenshots
let browser;
let scenarioFolder;
let stepCount = 0;

//Función para crear carpeta, limpiarla e iniciar variable stepCount
Before(function (scenario) {
  scenarioFolder = path.join(__dirname, '..', 'screenshots', scenario.pickle.name.replace(/ /g, '_'));

  if (fs.existsSync(scenarioFolder)) {
    clearFolder(scenarioFolder);
  } else {
    fs.mkdirSync(scenarioFolder, { recursive: true });
  }

  stepCount = 0; 
});

// Función para tomar capturas de pantalla con nombre y ubicación personalizados
async function takeScreenshot() {
  stepCount++;

  const screenshotName = `step${stepCount}_screenshot.png`;
  const screenshotPath = path.join(scenarioFolder, screenshotName);

  await browser.saveScreenshot(screenshotPath);
  console.log(`Screenshot saved: ${screenshotPath}`);
}

// Función para eliminar el contenido de una carpeta
function clearFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    fs.unlinkSync(filePath);
  }
}

//Tomar screenshots
When("I take screenshot", async function () {
  browser = this.driver;
  await takeScreenshot();
});

//Login
When(
  "I login ghost {kraken-string} and {kraken-string}",
  async function (email, password) {
    loginPage = new LoginPage(this.driver);
    await loginPage.enterEmail(email);
    await loginPage.enterPassword(password);
    await loginPage.clickSignInButton();
  }
);

//Scenario #1, #2
Then(
  "the URL should be dashboard {kraken-string}",
  async function (expectedUrl) {
    const currentUrl = await loginPage.getCurrentUrl();
    assert.strictEqual(
      currentUrl,
      expectedUrl,
      "URL did not match the expected URL"
    );
  }
);

When("I click posts", async function () {
  dashboard = new Dashboard(this.driver);
  await dashboard.clickPostsButton();
});

When("I click posts icon", async function () {
  dashboard = new Dashboard(this.driver);
  await dashboard.clickPostsIcon();
});

Then("the URL should be posts {kraken-string}", async function (expectedUrl) {
  dashboard = new Dashboard(this.driver);
  const currentUrl = await dashboard.getCurrentUrl();
  assert.strictEqual(
    currentUrl,
    expectedUrl,
    "URL did not match the expected URL"
  );
});

When("I click new post", async function () {
  posts = new Posts(this.driver);
  await posts.clickNewPostButton();
});

When("I create a new post", async function () {
  posts = new Posts(this.driver);
  await posts.enterTittle("TittleNewPost");
  await posts.enterContent("Content for Test New Post Scenario.");
});

When("I publish the post", async function () {
  await posts.clickPublishButton();
  await posts.clickPublishButtonDialog();
  await posts.clickPublishButtonDialogConfirm();
});

Then("The url should include {kraken-string}", async function (tittle) {
  const currentUrl = await dashboard.getCurrentUrl();

  assert.strictEqual(
    currentUrl.includes(tittle.toLowerCase()),
    true,
    `URL does not include ${tittle}`
  );
});

//Scenario #3
When("I click publish", async function () {
  await posts.clickPublishButton();
});

When("I click continue", async function () {
  await posts.clickContinue();
});

When("I click Editor", async function () {
  await posts.clickEditor();
});

When("I click Posts", async function () {
  await posts.clickPosts();
});

When("I count posts", async function () {
  posts = new Posts(this.driver);
  count = await posts.countPosts();
});

Then("The list of posts should increment", async function () {
  newCount = await posts.countPosts();
  assert.equal(newCount, count + 1);
});

Then("I should see Draft on the post", async function () {
  posts = new Posts(this.driver);
  const allPosts = await posts.getAllPosts();
  let isInDraftStatus = false;

  for (let post of allPosts) {
    let postUrl = await post.$('.gh-post-list-status');
    let hrefAttribute = await postUrl.getAttribute('href');
    let columnStatus = await post.$('.gh-post-list-status div span');
    let statusText = await columnStatus.getText();

    if (hrefAttribute == postSelectedInDraftStatus) {
      isInDraftStatus = (statusText == properties.POST_DRAFT_STATUS.toUpperCase());
    }
  }

  assert.equal(isInDraftStatus, true);
});

//Scenario #4
When("I click edit post", async function () {
  posts = new Posts(this.driver);
  const allPosts = await posts.getAllPosts();

  for (let post of allPosts) {
    let columnStatus = await post.$('.gh-post-list-status div span');
    let postUrl = await post.$('.gh-post-list-status');
    let statusText = await columnStatus.getText();

    if (statusText == properties.POST_DRAFT_STATUS.toUpperCase()) {
      postSelectedInDraftStatus = await postUrl.getAttribute('href');
      await columnStatus.click();
      break;
    }
  }
});

When("I edit a draft post", async function () {
  posts = new Posts(this.driver);
  await posts.deleteTittle();
  await posts.deleteContent();
  await posts.enterTittle("TittleEditedPost");
  await posts.enterContent("Content for Test Edited Post Scenario.");
});

Then("The list of posts should be the same", async function () {
  newCount = await posts.countPosts();
  assert.equal(newCount, count);
});

//Scenario #6
When('I click on a post', async function() {
  let selectedPostId = postsArray.posts[Math.random(0, 49)];
  posts = new Posts(this.driver);
  let urlEditPost = `${properties.EXPECTED_URL_EDITOR_POSTS}/${selectedPostId}`;
  await posts.clickOnAPost(urlEditPost);
})

When("I click in unpublish button", async function () {
  posts = new Posts(this.driver);
  await posts.unplublishPost();
});

When("I click on confirm unpublish", async function () {
  posts = new Posts(this.driver);
  await posts.confirmUnpublish();
});

Then("the post should be as {kraken-string}", async function (postStatus) {
  assert.equal(postStatus, properties.POST_DRAFT_STATUS);
});

// Scenario 7
Then('The update button should be disabled', async function() {
  let element = this.driver.$('button.gh-btn gh-btn-editor gh-editor-save-trigger green ember-view');

  if (undefined != element && null != element) {
    console.log(element);
    //assert.equal(element.disabled, true);
  }
});

//Scenario #11
When("I click published post", async function () {
  posts = new Posts(this.driver);
  const allPosts = await posts.getAllPosts();

  for (const post of allPosts) {
    const postText = await post.getText();
    if (postText.includes("Published")) {
      await posts.clickOnElement(post);
      break;
    }
  }
});

When("I click settings", async function () {
  posts = new Posts(this.driver);
  await posts.clickSettings();
});

When("I click delete post", async function () {
  posts = new Posts(this.driver);
  await posts.clickDelete();
});

When("I click confirm delete", async function () {
  posts = new Posts(this.driver);
  await posts.confirmDelete();
});

Then("The list of posts should decrement", async function () {
  newCount = await posts.countPosts();
  assert.equal(newCount, count - 1);
});

//Escenario #12
When("I click draft post", async function () {
  posts = new Posts(this.driver);
  const allPosts = await posts.getAllPosts();

  for (const post of allPosts) {
    const postText = await post.getText();
    if (postText.includes("Draft")) {
      await posts.clickOnElement(post);
      break;
    }
  }
});

//Escenario #13
When("I click cancel delete", async function () {
  posts = new Posts(this.driver);
  await posts.cancelDelete();
});

//Escenario #15

When('I click members', async function () {
  members = new Members(this.driver);
  await members.clickMembers();
})

Then("the URL should be members {kraken-string}", async function (expectedUrl) {
  const currentUrl = await members.getCurrentUrl();
  assert.strictEqual(
    currentUrl,
    expectedUrl,
    "URL did not match the expected URL"
  );
});

When('I click new member', async function () {
  members = new Members(this.driver);
  await members.clickNewMemberButton();
})

// Scenario 8
When('I modify the post title', async function() {
  posts = new Posts(this.driver);
  await posts.enterTittle(`${Math.random()} Lorem ipsum dolor sit amet ${Math.random()}`);
})

When('I modify the post body', async function() {
  posts = new Posts(this.driver);
  await posts.enterContent('Duis ante ligula, congue id ipsum ut, malesuada tincidunt massa.');
})

When('The update button is enabled', async function() {
  let updateButton = this.driver.$('button[data-test-button="publish-save"]')

  assert.notEqual(undefined, updateButton.disabled);
})

Then('I click in back to posts option to return', async function() {
  posts = new Posts(this.driver);
  await posts.backToPostsButton();
})
When('I create a new member', async function () {
  members = new Members(this.driver);
  await members.createNewMember("nombre","email@email.com","new member for tests");
})

Then('member state should be created', async function () {
  const text = await members.getState();
  //const text = await state.getText();

  assert.ok(text.includes('Created'), 'El usuario no ha sido creado');
})

Then('the Signup info includes "Created"', async function () {
  const attributionElement = await this.driver.$('.gh-member-details-attribution');
  const text = await attributionElement.getText();
  
  // Verifica que el texto incluya la cadena "Created"
  assert.ok(text.includes('Created'), 'El texto no incluye "Created"');
});

When('The update button is enabled', async function() {
  let updateButton = this.driver.$('button[data-test-button="publish-save"]')

  assert.notEqual(undefined, updateButton.disabled);
})

Then('I click in back to posts option to return', async function() {
  posts = new Posts(this.driver);
  posts.backToPostsButton();
});

When('I click posts to see the list', async function(){
  posts = new Posts(this.driver);
  posts = posts.goToPostsList();
});
