Feature: Escenario 1 de prueba Ghost con Kraken

@user1 @web
#Escenario 1. Login, navegar, crear y validar un nuevo post (dando click en texto Posts)
#Faker
Scenario: Escenario 1.
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click posts
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And I count posts

  When I click new post 
  And I wait for 1 seconds

  #Paso modificado para usar Faker
  And I create a new post with Faker
  And I wait for 1 seconds

  And I click publish
  And I wait for 2 seconds
  And I click continue
  And I wait for 2 seconds
  And I click post now
  And I wait for 2 seconds
  And I click Editor
  And I wait for 2 seconds
  And I click Posts
  And I wait for 2 seconds
  Then The list of posts should increment