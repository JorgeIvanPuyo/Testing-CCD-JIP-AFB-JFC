Feature: Escenario No. 8

@user @web
Scenario: Escenario No. 8. Verificar que se puede actualizar la información de una publicación
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME_ESC678910>" and "<PASSWORD_ESC678910>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  Given I navigate to page "<POST_PAGE_URL>"
  When I click on a post
  And I wait for 2 seconds
  Then The update button should be disabled
  And I wait for 2 seconds