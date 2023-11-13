Feature: Escenario 14 de prueba Ghost Kraken

@user1 @web
Scenario: Escenario 14. Cancelación en proceso de borrado de Post Publicado
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
  And I click delete post
  And I wait for 1 seconds
  And I click cancel delete
  And I wait for 1 seconds
  And I click Posts
  And I wait for 1 seconds
  And I click Posts
  And I wait for 1 seconds
  Then The list of posts should be the same






