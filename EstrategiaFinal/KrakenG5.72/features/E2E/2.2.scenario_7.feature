Feature: Escenarios No. 6, 7, 8, 9 y 10 de prueba Ghost

@user1 @web
Scenario: Escenario 7. Verificar que una publicación no se puede actualizar
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  Given I navigate to page "<POST_PAGE_URL>"
  When I click draft post
  And I wait for 2 seconds
  Then The update button should be disabled
  And I wait for 2 seconds