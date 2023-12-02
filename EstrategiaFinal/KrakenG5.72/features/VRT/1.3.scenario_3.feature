Feature: Escenario 3 de prueba Ghost Kraken

@user1 @web
#Escenario 3. Post. Modificado Estrategia Final. Ghost 5.72
Scenario: Escenario 3. 
  Given I navigate to page "<URL>"
  And I wait for 4 seconds
  #Screenshot1
  And I take screenshot 
  And I wait for 2 seconds

  When I login ghost "<WRONGNAME>" and "<WRONGPASS>"
  And I wait for 2 seconds
  #Screenshot2
  And I take screenshot

  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 3 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  #Screenshot3
  And I take screenshot 

  When I click posts
  And I wait for 1 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And I wait for 2 seconds 
  And I count posts
  #Screenshot4
  And I take screenshot 
  
  When I click new post 
  And I wait for 1 seconds
  And I create a new post 
  And I wait for 1 seconds
  And I click publish
  And I wait for 1 seconds
  And I click continue
  And I wait for 1 seconds
  And I click Editor
  And I wait for 1 seconds
  #Screenshot5
  And I take screenshot 

  And I click Posts
  And I wait for 1 seconds
  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  #Screenshot6
  And I take screenshot 

  Then The list of posts should be the same
  And I wait for 1 seconds
  Then I should see Draft on the post 
  And I wait for 1 seconds






