Feature: Escenario 16 de prueba de Ghost con Kraken modificado para Estrategia Final vrt

@user1 @web
Scenario: Escenario 4.
#Modificacion de Escenario 16 creación de un nuevo miembro Ghost 4.48
  Given I navigate to page "<URL>"
  And I wait for 4 seconds
  #Screenshot1
  And I take screenshot 
  And I wait for 2 seconds
  
  When I login ghost "<WRONGNAME>" and "<WRONGPASS>"
  And I wait for 4 seconds
  #Screenshot2
  And I take screenshot   

  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  #Screenshot3
  And I take screenshot 

  When I click members
  And I wait for 2 seconds 
  Then the URL should be members "<EXPECTED_URL_MEMBERS>"
  #Screenshot4
  And I take screenshot 

  When I click new member 
  And I wait for 1 seconds
  #Screenshot5
  And I take screenshot 

  And I create a new member with the email "<WRONG_EMAIL>"
  And I wait for 1 seconds
  #Screenshot6
  And I take screenshot

  And I create a new member
  And I wait for 4 seconds
  Then member state should be created
  And I wait for 2 seconds
  #Screenshot7
  And I take screenshot
