Feature: Escenario 5 de prueba Ghost Kraken

@user1 @web
Scenario: Escenario 5. Login, navegar, proceso de editar un post y publicarlo
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 1 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click posts
  And I wait for 1 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"

  When I click edit post
  And I wait for 1 seconds
  When I edit a draft post 
  And I wait for 1 seconds
  And I publish the post
  And I wait for 2 seconds
  Then The url should include "<EXPECTED_TITLE_NEW_POST>"
  And I wait for 2 seconds







