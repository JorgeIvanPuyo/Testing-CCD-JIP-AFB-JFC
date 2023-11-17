Feature: Escenario # 17 de prueba de Ghost en Kraken

@user1 @web
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click members
  And I wait for 2 seconds 
  Then the URL should be members "<EXPECTED_URL_MEMBERS>"