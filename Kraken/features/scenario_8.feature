Feature: Escenario No. 8

@user1 @web
Scenario: Escenario No. 8. Verificar que se puede actualizar la información de una publicación
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  Given I navigate to page "<POST_PAGE_URL>"
  When I click on a post
  And I wait for 2 seconds
  When I modify the post title
  # When I modify the post body
  And I wait for 15 seconds