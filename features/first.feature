Feature: Search functionality

    Background: Navigating to the amazon website
        Given User navigates to "http://www.amazon.com"
        
    Scenario: Searching for apple watch and verifying the number of results
        And Enters the "apple watch" into the search box
        When User clicks on search button
        Then Number of search results should be displayed

    @AppleLaptop
    Scenario Outline: Searching for "<product>" and verifying the number of results and comparing against the number of apple watch
        And Enters the "<product>" into the search box
        When User clicks on search button
        Then Number of search results should be displayed and compared against the apple watch
        When The highest price sorting filter has been clicked
        And The highest price has been compared to Employee's salary
    Examples:
    | product      | 
    | rolex watch  |
    | fossil watch |
    | bmw watch    |



    @SignIn
    Scenario Outline: Signing in with valid creadentials and verifying the account information
        Given User clicks on sign in link
        And Enters "<username>" in username and "<password>" in password fields
        When sign in button is clicked
        Then user's firstname "<firstname>" is displayed
    Examples:
    | username              | password   | firstname | lastname    |
    | aydana_9008@yahoo.com | Manat90081 | Aidana    | Yntykbayeva |
