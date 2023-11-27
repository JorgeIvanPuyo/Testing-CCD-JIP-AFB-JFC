Feature: Escenario No. 19. Pruebas de creación de un nuevo tag.

@user1 @web
Scenario: Creación de un nuevo tag
  Given I navigate to page "<URL>"
  When I login ghost "<USERNAME>" and "<PASSWORD>"
  And I wait for 2 seconds
  Then the URL should be dashboard "<EXPECTED_URL_DASHBOARD>"

  When  I click on Tags's page
  And   I wait for 2 seconds
  Then  The page should be "<EXPECTED_URL_TAGS>"

  When  I click on New Tag's button
  And   I wait for 2 seconds
  Then  The page should be "<EXPECTED_URL_NEW_TAGS>"

  When  I write the tag's name
  And   I wait for 1 seconds
  When  I choose the tag's color
  And   I wait for 1 seconds
  # When  I write the tag's slug
  # Then  The preview for the slug should show the URL append to new slug name
  When  I write the tag's description
  And   I wait for 1 seconds
  When  I click on save button
  And   I wait for 2 seconds
  When  I click on Tags's page
  # Then  The new tag should be created
  
  Given I navigate to page "<POST_PAGE_URL>"
  When  I click published post
  And   I wait for 2 seconds
  When  I click settings

  # When  I do click in Tag's input
  # And   I wait for 2 seconds
  # When  I select a tag
  # And   I wait for 2 seconds
  # Then  The update button should be enabled

  # Given I click on post's update button
  # And   I wait for 2 seconds
  # When  I back to posts list