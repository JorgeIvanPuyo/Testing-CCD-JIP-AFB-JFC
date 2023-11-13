Feature: Verificar que el botón update de una publicación esta deshabilitado.

@user1 @web
Scenario: Escenario 7. Verificar que una publicación no se puede actualizar
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
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
