Feature: Escenarios 1 de prueba Ghost con Kraken

@user1 @web
Scenario: Escenario 1. Login, navegar, crear y validar un nuevo post (dando click en texto Posts)
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click posts
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"

  When I click new post 
  And I wait for 1 seconds
  And I create a new post 
  And I wait for 1 seconds
  And I publish the post
  And I wait for 2 seconds
  Then The url should include "<EXPECTED_TITLE_NEW_POST>"
  And I wait for 5 seconds
  # Then I send a signal to user 2 containing "Escenario completo"








