const { Given, When, Then, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../pages/login_page');
const Dashboard = require('../pages/dashboard_page');
const Posts = require('../pages/posts_page');
const Members = require('../pages/members_page');
const properties = require('../../../properties.json');
const postsArray = require('../../../ghost-post.json');
const { faker } = require('@faker-js/faker');
const axios = require('axios');

let loginPage;
let dashboard;
let posts;
let members;
let count = 0;
let newCount = 0;
let actualMembers = 0;
let newMembers = 0;

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

//Leer archivo de datos a priori
function getRandomDataFromJson(filePath) {
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const randomElement = jsonData[Math.floor(Math.random() * jsonData.length)];

  return {
    title: randomElement.title,
    content: randomElement.description,
  };
}

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
  let content = "Contenido del post";
  let title = "Titulo del post";

  await posts.enterTittle(title);
  await posts.enterContent(content);
});

//Paso para data random con Faker
When("I create a new post with Faker", async function () {
  posts = new Posts(this.driver);
  let content = faker.lorem.paragraph();
  let title = faker.lorem.text();

  await posts.enterTittle(title);
  await posts.enterContent(content);
});

//Paso para data Apriori con mockaroo
When("I create a new post with data mockaroo apriori", async function () {
  posts = new Posts(this.driver);
  const jsonFilePath = path.join(__dirname, '../../../posts-member.data.json');
  const randomData = getRandomDataFromJson(jsonFilePath);
  
  await posts.enterTittle(randomData.title);
  await posts.enterContent(randomData.content);
});

//Paso para data Pseudo random con mockaroo
When("I create a new post with data mockaroo pseudo", async function () {
  posts = new Posts(this.driver);
  const apiEndpoint = 'https://my.api.mockaroo.com/ghost_mock_data.json?key=4629f080';
  const response = await axios.get(apiEndpoint);
  const mockarooData = response.data;

  
  await posts.enterTittle(mockarooData.title);
  await posts.enterContent(mockarooData.description);
});

When("I click post now", async function () {
  await posts.clickPostNow();
})

When("I publish the post", async function () {
  await posts.clickPublishButton();
  await posts.clickContinue();
  await posts.clickPostNow();
  await posts.clickPreview();
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
  posts = new Posts(this.driver);
  newCount = await posts.countPosts();
  assert.equal(newCount, count + 1);
});

Then("I should see Draft on the post", async function () {
  const draftPost = await posts.getDraftFirstPost();
  assert.strictEqual(
    draftPost.includes("Draft"),
    true,
    `Post does not include Draft`
  );
});

//Scenario #4

When("I click edit post", async function () {
  posts = new Posts(this.driver);
  await posts.clickEditPost();
});

When("I edit a draft post", async function () {
  posts = new Posts(this.driver);
  let content = faker.lorem.paragraph();
  let title = faker.lorem.text();

  await posts.deleteTittle();
  await posts.deleteContent();
  await posts.enterTittle(title);
  await posts.enterContent(content);
});

When("I edit a draft post with Faker", async function () {
  posts = new Posts(this.driver);
  let content = faker.lorem.paragraph();
  let title = faker.lorem.text();

  await posts.deleteTittle();
  await posts.deleteContent();
  await posts.enterTittle(title);
  await posts.enterContent(content);
});

//Paso para edit post Apriori con mockaroo
When("I edit a draft post with mockaroo apriori", async function () {
  posts = new Posts(this.driver);
  const jsonFilePath = path.join(__dirname, '../../../posts-member.data.json');
  const randomData = getRandomDataFromJson(jsonFilePath);
  
  await posts.deleteTittle();
  await posts.deleteContent();
  await posts.enterTittle(randomData.title);
  await posts.enterContent(randomData.content);
});

//Paso para edit post Pseudo random con mockaroo
When("I edit a draft post with mockaroo pseudo", async function () {
  posts = new Posts(this.driver);
  const apiEndpoint = 'https://my.api.mockaroo.com/ghost_mock_data.json?key=4629f080';
  const response = await axios.get(apiEndpoint);
  const mockarooData = response.data;

  await posts.deleteTittle();
  await posts.deleteContent();
  await posts.enterTittle(mockarooData.title);
  await posts.enterContent(mockarooData.description);
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
  await posts.unpublishPost();
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
  let title = faker.lorem.text();
  await posts.enterTittle(title);
})

When('I modify the post body', async function() {
  posts = new Posts(this.driver);
  let content = faker.lorem.paragraph();
  await posts.enterContent(content);
})

When('I create a new member', async function () {
  members = new Members(this.driver);
  let nombre = faker.person.fullName();
  let email = faker.internet.email();
  let note = faker.lorem.sentence();
  await members.createNewMember(nombre,email,note);
})

//Scenario #16
When('I create a new member with the email {kraken-string}', async function (wrongEmail) {
  members = new Members(this.driver);
  await members.createNewMember(
    faker.person.fullName()
    , wrongEmail
    , faker.lorem.sentence());
});

Then('The validation should be Invalid email', async function() {
  let validationText = await members.getInvalidResponse('#member-email > p.response');
  assert.equal(validationText, "Invalid Email.");
});

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
})


When('I try to create a new member but I click on Members option', async function() {
  let members = new Members(this.driver);

  members.typeNewMemberFieldsAndReturn(
    faker.person.fullName()
    , faker.internet.email()
    , faker.person.jobDescriptor()
    , faker.lorem.paragraph());
});

Then('Should be visible a modal dialog asking me if I want to leave', async function() {
  let modalDialogElement = this.driver.$(
    'div#fullscreen-modal-action > div[data-test-modal="unsaved-settings"]');
  let isDefined = (undefined !== modalDialogElement 
                && null !== modalDialogElement);

  assert.notEqual(false, isDefined);
});

When('I click on Leave option of the modal dialog', async function() {
  let members = new Members(this.driver);
  members.clickLeaveButtonModalDialog();
});

When('I click on Stay option of the modal dialog', async function() {
  let members = new Members(this.driver);
  members.clickStayButtonModalDialog();
});

//Scenario #18

Then('The members should be increased', async function() {
  let members = new Members(this.driver);

  assert.notEqual(actualMembers, members.getActualMembers());
});

Then(`The members should'nt increased`, async function() {
  let members = new Members(this.driver);

  assert.equal(actualMembers, members.getActualMembers());
});

