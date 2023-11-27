Feature: Escenario 4 de prueba Ghost Kraken

@user1 @web
#Escenario 4. Login, navegar, proceso de editar un post y guardarlo como draft
#Faker
Scenario: Escenario 4. 
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

  #Paso modificado para usar Faker
  And I edit a draft post with Faker
  And I wait for 1 seconds

  And I click Posts
  And I wait for 1 seconds

  Then the URL should be posts "<EXPECTED_URL_POSTS>"
  And The list of posts should be the same
  And I wait for 1 seconds
  And I should see Draft on the post 
  And I wait for 1 seconds








