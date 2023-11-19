Feature: Escenarios 3 de prueba Ghost Kraken

@user1 @web
#Escenario: Escenario 3. Login, navegar, proceso de crear un nuevo post incompleto, el post se debe guardar como draft
Scenario: Escenario 3.
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  #Screenshot1
  And I take screenshot

  When I click posts
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_EDITOR_POSTS>"
  And I wait for 2 seconds 
  And I count posts
  And I wait for 2 seconds 
  #Screenshot2
  And I take screenshot

  And I create a new post 
  And I wait for 3 seconds
  #Screenshot3
  And I take screenshot

  When I navigate to page "<EXPECTED_URL_POSTS>"
  And I wait for 2 seconds
  #Screenshot4
  And I take screenshot

  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And I wait for 2 seconds
  #Screenshot5
  And I take screenshot




