Feature: Escenario 16 de prueba de Ghost con Kraken

@user1 @web
Scenario: Escenario 16. Creación de un nuevo miembro.
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click members
  And I wait for 2 seconds 
  Then the URL should be members "<EXPECTED_URL_MEMBERS>"

  When I click new member 
  And I wait for 1 seconds
  And I create a new member with the email "<WRONG_EMAIL>"
  And I wait for 1 seconds
  Then The validation should be Invalid email
  And I wait for 2 seconds
  And I create a new member
  And I wait for 1 seconds
  Then member state should be created
  And I wait for 2 seconds

