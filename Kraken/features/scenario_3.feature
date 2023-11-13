Feature: Escenarios 3 de prueba Ghost Kraken

@user1 @web
Scenario: Escenario 3. Login, navegar, proceso de crear un nuevo post incompleto, el post se debe guardar como draft
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 1 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click posts
  And I wait for 1 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And I count posts
  
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
  And I click Posts
  And I wait for 1 seconds
  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  Then The list of posts should increment 
  And I wait for 1 seconds
  Then I should see Draft on the post 
  And I wait for 1 seconds





