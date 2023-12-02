Feature: Escenario No. 18 de prueba de Ghost en Kraken

@user1 @web
Scenario: Escenario No. 18. Intento de creación de un miembro y se decide no crear el miembro
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click members
  And I wait for 2 seconds 
  Then the URL should be members "<EXPECTED_URL_MEMBERS>"

  When I click new member 
  And I wait for 1 seconds
  When I try to create a new member but I click on Members option with apriori data generation
  Then Should be visible a modal dialog asking me if I want to leave
  And I wait for 2 seconds
  When I click on Leave option of the modal dialog
  Then The members should'nt increased