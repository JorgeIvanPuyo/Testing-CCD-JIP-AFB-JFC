Feature: Escenario 1 de prueba Ghost con Kraken

@user1 @web
#Escenario 1. Login Post. Modificado Estrategia Final. Ghost 5.72
Scenario: Escenario 1.
  Given I navigate to page "<URL>"
  And I wait for 4 seconds
  #Screenshot1
  And I take screenshot 
  And I wait for 2 seconds
  
  When I login ghost "<WRONGNAME>" and "<WRONGPASS>"
  And I wait for 4 seconds
  #Screenshot2
  And I take screenshot   

  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  #Screenshot3
  And I take screenshot 

  When I click posts
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"

  When I click new post 
  And I wait for 1 seconds
  #Screenshot4
  And I take screenshot

  And I create a new post 
  And I wait for 3 seconds
  #Screenshot5
  And I take screenshot

  And I publish the post
  And I wait for 2 seconds

  When I navigate to page "<EXPECTED_URL_POSTS>"
  And I wait for 4 seconds
    #Screenshot6
  And I take screenshot

