Feature: Escenarios 15 de prueba Ghost con Kraken
​
@user1 @web
Scenario: Escenario 15. Creación de un nuevo member
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  And I wait for 2 seconds

  When I click members
  And I wait for 2 seconds 
  Then the URL should be members "<EXPECTED_URL_MEMBERS>"

  When I click new member 
  And I wait for 1 seconds

  #Paso modificado para usar data mockaroo apriori
  And I create a new member with apriori data generation
  And I wait for 3 seconds

  Then member state should be created
  And I wait for 2 seconds

  #El member no debe existir para que pueda ser creado







