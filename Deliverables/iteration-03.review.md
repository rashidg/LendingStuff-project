
# LendingStuff/team_22

## Iteration 3 - Review & Retrospect
 * When: March 31, 2018
 * Where: Graham Library, Group Room 4

## Process - Reflection

#### Decisions that turned out well
 * Using YouTrack priority settings for each ticket
    * This helped the code reviews to be done in order of priority. Also, if someone completed the assigned ticket earlier, he/she took the unassigned ticket with the highest priority.
 * Opening branches for WIP code
    * This allowed us to catch errors and discuss code design early on.
    * This improved code review, as it was more helpful to receive comments from other members as functionality was being implemented. 
    * Using “WIP” tag allowed team members to distinguish between a branch that was ready to be merged into the master branch and a branch with potential bugs that needed reviews.

#### Decisions that did not turn out as well as we hoped

 * __Coding sessions__ did not turn out well because it was difficult to find a suitable time every week, as well as it was inefficient since we are working on different features.
 * __Meeting times__ did not turn out well because we realized we meet too soon after each meeting which did not allow us to make reasonable changes, so we decided to change the sync’ meetings to Tuesday because it gave us more time to find discussion topics.

 * __Changing task state__ in YouTrack by the user who implemented the feature was only good until code review because the user who implemented the feature did not know when the feature will be reviewed and when it is going to be merged. So instead, the person who reviews the code would change the task state to Code Review and then Done if they merged it.

#### Planned changes

 * Because we will no longer be holding tutorials, we will reschedule our meeting dates to discuss design requirements and our planned direction for the app.

## Product - Review

#### Goals and/or tasks that were met/completed:

 * We fully implemented search logic within the app: It is possible to sort by multiple parameters and use the filter button to filter out the result further.
 * We can now verify transactions from a single requesting user:
* Once the item is requested, the lender may confirm or deny the request.
* Once a request has been confirmed (changing the requester to the renter), the transaction is uploaded to the DB. Then, both users may agree that they have returned the item.
* Once an item has been agreed upon as “returned” by both users, it may be closed and the item & transaction will be removed from the DB.
 * We implemented posting and fetching of reviews (tied to a given item). 
    * We created a separate collection of reviews. 
* Reviews for a given item is fetched upon loading item details scene.
* Posting a review is only allowed if the currently logged-in user has rented the item
 * We implemented registration with email and password.
 * We implemented the functionality to post items with images. 
 * The renter can now see the location of the item and the directions to it by clicking on a button which redirects the user to Google/Apple maps.

#### Goals and/or tasks that were planned but not met/completed:

 * We do not yet support multiple requests for a single item (so that the lender may pick and choose who to rent the item to).
 * We do not yet notify users upon the change in status of a lent/requested/rented item (though the workflow still functions): we decided it might be too intensive for the app to be listening for requests all the time, and so we wanted to send messages directly from the DB instead (which required more time).
 * We did not (significantly) improve the styling of the ItemDetail page.

## Meeting Highlights

Going into the next iteration, our main insights are:

 * We want to integrate map functionality into the app.
 * We want to directly notify users (through the app) upon the change in the status of an item.
 * We want to implement payment through the app.
 * Schedules permitting, we want to schedule more regular weekly meetings and in-person coding sessions (should we continue to work on the app).
