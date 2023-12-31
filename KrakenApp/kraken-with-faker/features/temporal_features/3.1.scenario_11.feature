Feature: Escenario 11 de prueba Ghost Kraken

@user1 @web
Scenario: Escenario 11. Borrado de un Post Publicado.
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 1 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click posts
  And I wait for 1 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And I count posts
  
  When I click published post
  And I wait for 1 seconds
  And I click settings
  And I wait for 1 seconds
  And I take screenshot
  And I click delete post
  And I wait for 1 seconds
  And I click confirm delete
  And I take screenshot
  And I wait for 2 seconds
  Then The list of posts should decrement