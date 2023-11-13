Feature: Escenario No. 10

@user1 @web
Scenario: Escenario No. 10 borrar una publicación
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME1>" and "<PASSWORD1>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"
  Given I navigate to page "<POST_PAGE_URL>"
  When I click on a post
  And I wait for 2 seconds
  And I click settings
  And I wait for 1 seconds
  And I click delete post
  And I wait for 1 seconds
  And I click confirm delete
  And I wait for 2 seconds
  Then The list of posts should decrement