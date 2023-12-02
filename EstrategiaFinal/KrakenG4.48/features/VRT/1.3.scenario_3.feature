Feature: Escenarios 3 de prueba Ghost Kraken

@user1 @web
#Escenario 3.Post. Modificado Estrategia Final. Ghost 4.48
Scenario: Escenario 3.
  Given I navigate to page "<URL>"
  And I wait for 4 seconds
  #Screenshot1
  And I take screenshot 
  And I wait for 2 seconds

  When I login ghost "<WRONGNAME>" and "<WRONGPASS>"
  And I wait for 4 seconds
  #Screenshot2
  And I take screenshot

  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 6 seconds
  #Screenshot3
  And I take screenshot
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click posts
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And I wait for 2 seconds 
  And I count posts
  And I wait for 2 seconds 
  #Screenshot4
  And I take screenshot

  And I click new post
  And I wait for 2 seconds
  And I create a new post 
  And I wait for 3 seconds
  #Screenshot5
  And I take screenshot

  When I navigate to page "<EXPECTED_URL_POSTS>"
  And I wait for 2 seconds
  #Screenshot6
  And I take screenshot

  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And I wait for 2 seconds
  Then The list of posts should be the same
  And I wait for 1 seconds





