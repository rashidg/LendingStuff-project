# LendingStuff/team_22

## Iteration 02
 * Start date: Feb 23
 * End date: Mar 9

## Process

#### Roles & responsibilities

 * Team leader: Rashid
 	* Will come up with tickets for each week
 	* Will ensure that each members are on track
 	* Will perform code review
 * Product owner: Amr
 	* Will come up with requirements for the app
 	* Will define the workflow
 	* Will define the visual aspect of the app
 * Back-end developer: Alec, Sheila
 	* Will define database schema
 	* Will implement firebase integration into the app
 * Front-end developer: Donna, Jason
 	* Will skeleton code for the app
 	* Will implement navigation through scenes
 	* Will implement styling for the app

#### Events

 * Weekly meeting: Thursday
 	* location: tutorial room
 	* to discuss problems encountered with the TA
 * Weekly meeting: Friday
 	* location: TBD
 	* review previous week
 	* to decide on specific items to get done before the next meeting
 * We will have online meetings on Sunday when necessary.

#### Artifacts

 * Project management: Trello: [https://trello.com/b/wgqXn3yi/lendingstuff]
 	* create tickets, assign up to two members
 	* attach story points to prioritize
 	* aim to finish a defined set of tickets every week

#### Git / GitHub workflow

 * Use a separate branch for each ticket
 	** avoids conflicts caused by multiple people working on the same branch but for different purpose
 	** makes code review easier, since each branch has a defined goal to achieve
 * Each pull request should be reviewed by the team leader, and at least one other member
 	** allows getting different perspective, which are useful for catching errors and maintaining code readability


## Product

#### Goals and tasks

 * Main goal: By the end of this iteration, it should be possible to:
 	* search for items
 	* view details of a specific item
 	* post an item, which gets added to the database
 	* rent an item, which updates the item's status to "rented"
 * Tasks (in order of priority)
 	* create mockup to provide guideline for implementing scenes and components
 	* create skeleton code for the app
 	* implement the repeatedly-used components
 		* Item Card
 		* Category
 	* implement the necessary scenes for the workflow (in order of priority)
 		* Search
 		* Searcg Result
 		* Post
 		* Rented Items
 		* My Items
 	* define database schema
 	* integrate firebase to the app
 	* implement API services
 	* decide on landing page for the app
 	* decide on the overall style of the app

#### Artifacts

 * Mockups are on [Figma](https://www.figma.com/file/TuuidWH5QxTfadgI7hF3MmoT/LendingStuff):
 	* give guideline for implementing scenes
 	* can be shared between members for editing
 * Our database schema: [Part 1](https://github.com/csc301-winter-2018/project-team-22/blob/master/Deliverables/Schema/schema_1.jpg) [Part 2](https://github.com/csc301-winter-2018/project-team-22/blob/master/Deliverables/Schema/schema_2.jpg)
 	* essential for writing methods that deal with database
 	* members can implement how to render data by referring to this schema
 * Our [demo video](https://drive.google.com/file/d/1evo8pu8DTtGn09ZxTuLVv0WyxjAkxstZ/view):
 	* shows the process made
 	* shows how the app will be used
