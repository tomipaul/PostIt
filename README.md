# PostIt
[![Build Status](https://travis-ci.org/tomipaul/PostIt.svg?branch=develop)](https://travis-ci.org/tomipaul/PostIt) [![Coverage Status](https://coveralls.io/repos/github/tomipaul/PostIt/badge.svg?branch=develop)](https://coveralls.io/github/tomipaul/PostIt?branch=develop) [![Code Climate](https://codeclimate.com/github/tomipaul/PostIt/badges/gpa.svg)](https://codeclimate.com/github/tomipaul/PostIt)

Introduction
------------
*  PostIt is a simple application that implements a distributed messaging system. It allows friends and colleagues to create groups for messages and notifications.

Features
--------
*  It has the following basic features;

    - Users can authenticate to the application
    - Users can create a group
    - Users can add other users to a group
    - Users can post a message to a group
    - Users can view messages posted to their groups

You can check out the online version at https://app-postit.herokuapp.com/
Also, you can use [postman](https://www.getpostman.com/) to consume the Restful API provided by the application
See https://app-postit.herokuapp.com/api/doc for the api documentation


Technologies
-----------
#### Server
- The application was developed with [NodeJs](http://nodejs.org)
- [Express](http://expressjs.com) was used for routing
- The [Postgres](http://postgresql.com) database was used with [sequelize](http://sequelizejs.com) as the ORM

#### Client
The frontend was developed with [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/)

**Some other tools used include**:
- [Babel](https://babeljs.io) to transpile ES6 to ES5
- [Webpack](https://webpack.js.org/) to bundle assets
- [Materialize](http://materializecss.com/) to add styles and components that implement the Google Material Design specifications

Installation
------------
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `https://github.com/tomipaul/PostIt`
3.  Change your directory `cd PostIt`
4.  Install all dependencies `npm install`
5.  Create a .env file in the root of the folder following the format in the provided .env.example file.
6.  Start the app with `npm start`
7.  You can now use PostIt by visiting http://localhost:port (where port is the PORT environment variable in your .env file).
7.  To launch the app in a development-optimized environment, you have to run `npm run start:dev` on a terminal to start up the server application and then run `npm run build:dev` on another terminal to start up the client application. This setup is recommended for development.

Tests
-----
#### Server
*  The backend tests have been written using Mocha framework and Chai assertion library
*  Run the test with `npm test`

#### Client
*  The frontend tests have been written using Jest framework and assertion library
*  [nock](https://www.npmjs.com/package/nock) was used to mock API calls
*  [redux-mock-store](http://arnaudbenard.com/redux-mock-store/) was used to mock the redux store
*  [enzyme](https://www.npmjs.com/package/enzyme) was used to mount components for tests
*  Run the tests with `npm run frontend:test`

Contributions
-------------
**Contributions are welcome.** [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/tomipaul/PostIt/issues)
1. Fork this repositry.
2. Clone to your local environment: git clone git@github.com:your-username/inverted-index.git
3. Create a branch on a feature you want to work on: git checkout -b proposed-feature
4. Commit your changes: git commit -m "new stuff added"
5. Push to the remote branch: git push origin proposed-feature
6. Open a pull request on here

Limitations
-----------
- Updating a user's profile: On the backend, there is an endpoint that allows a user to update his/her profile but it is not implemented on the frontend
- Removing a user from a group: On the backend, there is an endpoint that permits the creator of a group to remove a user from the group, but it is not implemented on the frontend 
- Deleting a group: On the backend, there is an endpoint that permits the creator of a group to delete the group but it is not implemented on the frontend.

In addition:
- A user cannot delete a message he/she posted to a group
- When a user is added to a new group, notifications are not sent. Also, the user has to refresh the page to see the updated groups list.
- Although messages do not cluster the user's board, proper archiving is not done and users cannot see older messages.

Frequently Asked Questions (FAQs)
---------------------------------
- How do I see the groups I belong to?
On succesful authentication, user is taken to the dashboard
All the groups a user belongs to is listed on the left sidebar of the user's dashboard

- How do I see all groups?
A user cannot see all groups.
You can only see the groups you created and those you've been added to as a member 

- How do I view a group's messages
  On the dashboard, you can click on the intended group to view messages

- How do I add a user to a group
On the dashboard, there is a header where the group name and description is displayed.
On the header is a caret-down icon which on click drops down a menu.
Click on `Add User`; this brings out a search box where you can search for users
For every searchstring input, users with username that match the searchstring are displayed with an add icon
Click on the add icon to add the intended user
On the dropdown menu, there's also the `Member List` option which on click shows a list of all the group members. You can click on any member in the list to view the member's profile.

- How can I see all members of a particular group?
See above question `How do I add a user to a group?`

License
-------
This project is available for use and modification under the MIT License. See the LICENSE file for more details.
