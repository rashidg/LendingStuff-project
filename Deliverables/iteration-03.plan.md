
# LendingStuf/team_22  
## Iteration 3  
* Start date: Mar 10
* End date: Mar 31  
  
## Process  
 
#### Changes from the previous iteration

* __Weekly 2-hour coding session__: During the last iteration, there were problems that were difficult to resolve online. The components were more interdependent than we had expected, and changes resulted in conflicts across multiple components. Since it was easier to discuss the problems when we explained our code in person, we want to try a weekly in-person 2-hour coding session.
* __Using priority setting on YouTrack board to manage tickets__: During the last iteration, we weren't able to fully take advantage of the service provided by YouTrack, including priority setting for each ticket. During this iteration, we want to use this to keep better track of the priorities for the tasks. 
  
  
#### Roles & responsibilities  
* Team leader: Rashid  
    * Will come up with tickets for each week  
    * Will ensure that all group members are on track  
    * Will perform code review and merge pull requests on Github  
* Product owner: Amr  
    * Will come up with additional features for the app  
    * Will review the user workflow  
    * Will define the visual aspect of the app  
* Back-end developer: Alec  
    * Will iterate upon the database schema as necessary  
    * Will write methods for transaction, review submission and login/register workflow in firebase  
* Front-end developer: Donna  
    * Will incorporate additional scenes to app navigation (ex. Login/Register and Review scenes)  
    * Will implement styling for the app

#### Events  
* __Weekly group coding session__: 
    * in-person (or online through Google Hangouts)
    * __Friday at 3-5 pm__
    * __OISE__ study room
    * purpose: (explained above)
* __Quick weekly sync' meeting__:
    * on-line through Google Hangouts
    * __Saturday at 3-4pm__
    * purpose: update each other on current week's progress
* __Tutorial meeting__:
    * in-person (or online through Google Hangouts)
    * __Thursday at 1-2pm__
    * purpose: assign roles (tickets) and brainstorm the features to implement next.
  
#### Artifacts  
  
List/describe the artifacts you will produce in order to organize your team.

  
* Project management: YouTrack
    * As with the previous iteration, we will use YouTrack Agile board to assign tickets and manage the process. 
    * Tickets will be assigned to a team member during Thursday meeting. 
    * Each member will change the status of the assigned tickets depending on the progress (TODO/In Progress/Code Review/DONE)
    * As explained above, we will use YouTrack priority setting for each ticket to prioritize task.

#### Git / GitHub workflow
* Create __work-in-progress pull-request__ once a minimal functionality has been implemented in a feature branch, with “__WIP__” tag
    * Pull-request will be performed from feature branch into master.
    * This will allow other team members to start code review early on. Since team lead will be performing code review throughout the iteration, errors can be caught early on in the process.
    * Using “WIP” tag will indicate that the pull-request is not to be closed.
* Create a new branch if two people or more are working on the same feature
    * This will allow us to keep track of the new feature added by the other person in case we wanted to merge the older version instead of removing the new commits.
  
## Product  
  
#### Goals and tasks
* __Main goal__: By the end of this iteration, it should be possible to:  
    * search for items with multiple parameters other than category, and view the results in result view.
    * verify transaction (rent-lend):
        1. The user must request an item for rent.
        2. Lender of the item must approve the rent request
        3. Both renter and lender must confirm the return of the item before the item may be closed in terms of the transaction.
    * submit reviews for items that the user has rented
    * register or login with email and password
    * post an item with an image (and display it in ItemDetail)
    * see the location of the item and the directions to it on any map application installed on the phone

* __Tasks__ (in order of priority)  
    * fully implement the search logic (explained above)
    * implement the firebase methods for managing transactions:
        * get the transaction corresponding to an item (and determine the owner/lender)
        * request the item for rent
        * approve or reject the renting request of an item
        * confirm the item return
        * remove the item from the DB
        * implement methods to notify users of a change in the status of the item for which they are the lender/requester/renter
    * implement firebase methods to submit/fetch reviews
        * submitting review should be allowed only if the user has rented the item  
    * implement the components and scenes related to review workflow  
        * Review component  
        * Submit Review scene
        * Review List scene
    * implement functions to post items with images
    * implement functions to display meeting location for the items and calculate the distance
    * improve the styling of Item Detail scene

#### Artifacts  
* Video demo: On Youtube (with the link in Github)
    * briefly go over the use cases of the new functionality of the app
    * show the new and improved user workflow
    * This artifact is useful because it shows the potential users how they are going to use the app, which is necessary to make sense of the features of the app and show how it fixes the problems of the persona included in the beginning.
* App screenshot: On Github
    * show the item detail page with the new image feature
    * show how the reviews, along with the rating, on an image look like
    * show buttons for showing the directions to the item and the location of the item
    * show Google Maps app opened with the directions to the item
    * This artifact is useful for discussing whether we achieved what we wanted in terms of the front-end development and the styling of the feature, instead of showing the code to each other.