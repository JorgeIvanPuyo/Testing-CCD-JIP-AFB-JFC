Feature: Escenario 1 de prueba Ghost con Kraken

@user1 @web
#Escenario 1. Login, navegar, crear y validar un nuevo post (dando click en texto Posts)
Scenario: Escenario 1.
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  #Screenshot1
  And I take screenshot   

  When I click posts
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_EDITOR_POSTS>"
  #Screenshot2
  And I take screenshot 

  And I create a new post 
  And I wait for 1 seconds
  #Screenshot3
  And I take screenshot 

  And I publish the post
  And I wait for 2 seconds
  #Screenshot4
  And I take screenshot
  When I navigate to page "<EXPECTED_URL_POSTS>"
  And I wait for 1 seconds
  









