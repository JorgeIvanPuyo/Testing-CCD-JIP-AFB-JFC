Feature: Escenarios No. 9

@user1 @web
Scenario: Escenario 9. Verificar que una publicación no se modifique
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  Given I navigate to page "<POST_PAGE_URL>"
  When I click published post
  And I wait for 2 seconds
  When I modify the post title
  When I modify the post body
  And I wait for 2 seconds
  When The update button is enabled
  And I wait for 2 seconds
  Then I click in back to posts option to return
  And I wait for 1 seconds 