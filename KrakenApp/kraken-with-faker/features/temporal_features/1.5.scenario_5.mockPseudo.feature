Feature: Escenario 5 de prueba Ghost Kraken

@user1 @web
#Escenario 5. Login, navegar, proceso de editar un post y publicarlo
#Mockaroo Pseudo aleatorio usando API
Scenario: Escenario 5.
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 1 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click posts
  And I wait for 1 seconds 
  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And I count posts

  When I click edit post
  And I wait for 1 seconds

  #Paso modificado para usar data mockaroo psudo aleatorio usando API
  And I create a new post with data mockaroo pseudo
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
  Then The list of posts should be the same






