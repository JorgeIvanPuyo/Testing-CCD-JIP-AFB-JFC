Feature: Escenario 2 de prueba Ghost Kraken

@user2 @web
#Escenario 2. Login, navegar, crear y validar un nuevo post (dando click en icono new Post)
Scenario: Escenario 2. 
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 1 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  #Screenshot1
  And I take screenshot 

  When I click posts icon
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_EDITOR_POSTS>"
  #Screenshot2
  And I take screenshot 
  
  When I create a new post 
  And I wait for 1 seconds
  And I publish the post
  #Screenshot3
  And I take screenshot
  And I wait for 2 seconds
  Then The url should include "<EXPECTED_TITLE_NEW_POST>"
  And I wait for 2 seconds
 







