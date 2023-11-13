Feature: Dar de baja una publicación

@user1 @web
Scenario: Escenario 7. Dar de baja una publicación
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  Given I navigate to page "<POST_PAGE_URL>"
  When I click on a post
  And I wait for 2 seconds
  When I click in unpublish button
  And I wait for 2 seconds
  When I click on confirm unpublish
  And I wait for 2 seconds
  Given I navigate to page "<POST_PAGE_URL>"
  Then the post should be as "<POST_DRAFT_STATUS>"
  And I wait for 2 seconds