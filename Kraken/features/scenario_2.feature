Feature: Escenario 2 de prueba Ghost Kraken

@user2 @web
Scenario: Escenario 2. Login, navegar, crear y validar un nuevo post (dando click en icono new Post)
  # And I wait for a signal containing "Escenario completo" for 20 seconds
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 1 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click posts icon
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_EDITOR_POSTS>"
  
  And I create a new post 
  And I wait for 1 seconds
  And I publish the post
  And I wait for 2 seconds
  Then The url should include "<EXPECTED_TITLE_NEW_POST>"
  And I wait for 2 seconds







