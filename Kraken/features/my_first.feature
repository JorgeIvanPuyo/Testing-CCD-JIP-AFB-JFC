Feature: Escenarios de prueba Ghost

@user1 @web
Scenario: Escenario 1. Login, navegar, crear y validar un nuevo post
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click posts
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"

  When I click new post 
  And I create a new post
  And I wait for 5 seconds

