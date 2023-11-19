Feature: Escenarios 4 de prueba Ghost Kraken

@user1 @web
#Escenario 4. Login, navegar, proceso de editar un post y guardarlo como draft
Scenario: Escenario 4. 
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  #Screenshot1
  And I take screenshot 

  When I click posts to see the list
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And I count posts
  #Screenshot2
  And I take screenshot 

  When I click edit post
  And I wait for 1 seconds
  #Screenshot3
  And I take screenshot 

  And I edit a draft post 
  And I wait for 1 seconds
  And I click Posts
  And I wait for 1 seconds
  #Screenshot4
  And I take screenshot 

  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And The list of posts should be the same
  And I wait for 1 seconds
  And I should see Draft on the post 
  And I wait for 1 seconds
  #Screenshot5
  And I take screenshot 








