# YOUR PRODUCT/TEAM NAME

## Iteration XX - Review & Retrospect

 * When: Mar 9, 4pm
 * Where: Graham Library Room. 2

## Process - Reflection

#### Decisions that turned out well
 * Weekly meeting
 	** This allowed all members to meet and communicate problems encountered and plan for the next week. Although resolving merge conflicts and communication between backend and frontend developers were done between members, this was a good way to update all team members on progress.
 * Using separate branch for each ticket
	** A lot of code conflicts were avoided by using separate branch, since working on one ticket often involved changing multiple files.
	** Branching doesn't create a new repository unlike forking, and it was easier to switch between branches.
 * Changing project management tool from Trello to YouTrack
 	** link/screenshoht:
 	** YouTrack separates backlog and sprint board. This allows viewing the sprint board without being distracted by tickets that are not relevant to the current sprint.
 * Prioritizing tickets
 	** We listed the tickets on YouTrack sprint board in the order of priority.
 	** This helped the members who did code reviews to prioritize when there were multiple pull request into master branch on github.

#### Decisions that did not turn out as well as we hoped

 * Using Trello as project management tool
 	** Backlog cluttered the board, which distracted the members when looking at the board. This led to switching to YouTrack
 	** We allocated tickets every week, but it was not possible to have separate boards for each week.
 * Not creating separate boards for each week
 	** It was difficult to differentiate what was done each week.
 	** As with Trello board, YouTrack board was still cluttered with old tickets.

#### Planned changes

List any process-related changes you are planning to make (if there are any)
 * Have weekly 2-hour coding session
 	** It was hard to discuss issues that related to the project globally when not everyone was reading messages on group chat.
 	** Fixing bugs were done much more efficiently when members coded together.
 * Have a on-line meeting twice a week
 	** This meeting will be used to update other members on progress made so far, and also to discuss any problems encountered that need to be solved as a group.
 * Enforce updating YouTrack tickets when process was made
 	** This will allow all members to be up to date with others' processes, and perform code reviews when necessary.


## Product - Review

#### Goals and/or tasks that were met/completed:

 * We created the mockup of each of the scenes and components.
 * We created skeleton code to allow us to navigate the app.
 * We implemented the repeatedly-used components: Item Card (in Item.js), and Category (in Category.js)
 * We implemented the necessary scenes for the workflow: we may search for items, view the search result, post items, and view items that we have posted or rented.
 * We defined the database schema: we can store Items, Transactions, and Users
 * We implemented firebase into the app: 
	 ** It is possible to search for items by category.
	 ** It is possible to view the details about of specific item.
	 ** We can post an item to the database and rent it.
	 ** We integrated firebase (through the API) into the search results, my items page, rented items page, and into the posting and renting of items: the basic structure of a transaction. 

#### Goals and/or tasks that were planned but not met/completed:

 * Search does not currently support duration, location, or parameters other than category.
 * The item detail page does not yet show images.
 * We cannot yet post images to the DB.
 * We have a basic style for the app but it needs improvement.
 * We did not yet redirect the app to a landing page (ideally the search results page)

## Meeting Highlights

Going into the next iteration, our main insights are:

 * Make a separate file for styling code: so that we have a more global and reusable style for the app.
 * Refactor myItems and rentedItems so that we don't repeat the common code used in search results.
 * Separate code into scenes and components: overall, better organize the app into folders.
 * The app needs better authentication overall: login, approvement of transcations, confirmation of returns and better payment options and reviews/ratings.
 * The app needs to be better built to support searches: maps for location, and logic for the sortbar.
 * 

 * 2 - 4 items
 * Short (no more than one short paragraph per item)
 * High-level concepts that should guide your work for the next iteration.
 * These concepts should help you decide on where to focus your efforts.
 * Can be related to product and/or process.