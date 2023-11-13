Feature: Escenarios No. 6, 7, 8, 9 y 10 de prueba Ghost

@user1 @web
Scenario: Escenario 6. Dar de baja una publicación
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME_ESC678910>" and "<PASSWORD_ESC678910>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When I click posts icon
  And I wait for 2 seconds 
  Then the URL should be posts "<EXPECTED_URL_EDITOR_POSTS>"
  
  And I create a new post 
  And I wait for 1 seconds
  And I publish the post
  And I wait for 2 seconds

  When I click in unpublish button
  When I click on confirm unpublish
  And I wait for 2 seconds
  Given I navigate to page "<POST_PAGE_URL>"
  Then the post should be as "<POST_DRAFT_STATUS>"
  And I wait for 10 seconds