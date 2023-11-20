Feature: Escenario 5 de prueba Ghost Kraken

@user1 @web
#Escenario 5. Login, navegar, proceso de editar un post y publicarlo
Scenario: Escenario 5.
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 1 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  #Screenshot1
  And I take screenshot 

  When I click posts
  And I wait for 1 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  #Screenshot2
  And I take screenshot 

  When I click edit post
  And I wait for 1 seconds
  #Screenshot3
  And I take screenshot 

  When I edit a draft post 
  And I wait for 1 seconds
  And I publish the post
  And I wait for 2 seconds
    #Screenshot4
  And I take screenshot 
  Then The url should include "<EXPECTED_TITLE_NEW_POST>"
  And I wait for 2 seconds








