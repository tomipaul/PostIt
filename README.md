# PostIt
[![Build Status](https://travis-ci.org/tomipaul/PostIt.svg?branch=develop)](https://travis-ci.org/tomipaul/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/tomipaul/PostIt/badge.svg?branch=develop)](https://coveralls.io/github/tomipaul/PostIt?branch=develop)
[![Code Climate](https://codeclimate.com/github/tomipaul/PostIt/badges/gpa.svg)](https://codeclimate.com/github/tomipaul/PostIt)

## Introduction
*  **`PostIt`** is a simple application that implements a distributed messaging system. It allows friends and colleagues create groups for messages and notifications.
*  It has the following features;
  - Allow users to signup
  - Allow users to signin
  - Allow users to create a group
  - Allow users to add other users to a group
  - Allow users to post a message to a group
  - Allow users to read messages posted to groups to which they belong

## How it works
You can check out the online version at https://app-postit.herokuapp.com/
* **`PostIt`** exposes the following endpoints
  * `POST` api/user/signup - takes username, email, phoneNo, and password. It creates a user and returns the user details
    * username is a string which represents the name of the user in the application e.g `tomipaul89`
    * email is a string which represents the email address of the user e.g `tomi@paul.com`
    * phoneNo is a string which respresents the mobile number of the user e.g `2348107976596`
    * password is a string which represents the user password
    * To be a valid payload (an example is shown below):
      - the username must be a non empty alphanumeric string with a maximum length of 20
      - the password must be a string with at least 6 characters long
      - the email must be a non empty valid email address
      - the phoneNo must be a non empty numeric string
    
    An example of a valid JSON payload to the endpoint will be:
    ```
      {
        "username": "tomipaul89",
        "email": "tomi@paul.com",
        "phoneNo": "2348107976596", 
        "password": "123456"
      }
    ```
  * `POST` api/user/signin - takes username and password. It signs in a user and returns an authorization token
    
    An example of a valid JSON payload to the endpoint will be:
    ```
      {
        "username": "tomipaul89",
        "password": "123456"
      }
    ```
  The endpoints above are authentication endpoints so they do not require any authorization token.

  Other endpoints listed below require a user to be authenticated. Tokens obtained from authentication must be sent along with every request to the endpoints.

  * Tokens can be embedded in the following ways:
    * request body: As part of the data sent in the request body via key `token`
      ```
        {
          ...
          token: "abcdef123456"
        }
      ```
    * request header: As part of the metadata sent in request headers via key `Authorization`
      ```
        Authorization: "Bearer abcdef123456"
      ```
    * request query: As part of the query string in request url
      ```
        https://app-postit.herokuapp.com/?token=abcdef123456
      ```
    * request cookie: It can be set as a cookie on the client so that it is sent with every request to the api

  * `POST` api/group - Create a group; takes group name and description and returns the created group
    * name: the title of the group
    * description: A short description of the group. It could be as short as `family` or as long as `Andela Talent Accelerator Fellows Cohorts 30 and 31`
    * To be a valid payload (an example is shown below):
      - the name must be a non empty string. It can only contain alphabets, numbers and underscores

    An example of a valid JSON payload to the endpoint will be:
    ```
      {
        "name": "FriendsAndFamily",
        "description": "Friends and Family"
      }
    ```
    `description` can be null or empty, this is also valid
    ```
      {
        "name": "HighSchoolColleagues2034",
      }
    ```
  * `POST` /api/group/:groupId/user - Add user to a group; takes username of a user and add user to group specified by groupId
    groupId is part of the response returned when a group is created

    An example of a valid JSON payload to the endpoint will be:
    ```
      {
        "username": "tomipaul89"
      }
    ```
  * `DELETE` /api/group/:groupId/user - Delete user from a group.
    An example of a valid JSON payload to the endpoint will be:
    ```
      {
        "username": "tomipaul89"
      }
    ```
  * `POST` /api/group/:groupId/message - Post message to group; takes a message and post it to group specified by groupId.
    groupId is part of the response returned when a group is created
    A message has a text and priority
    * text: the message string
    * priority: one of `normal`, `urgent` and `critical`. It defaults to `normal`
    * To be a valid payload (an example is shown below):
      - the text must be a non-empty string
      - priority must be one of `normal`, `urgent` and `critical`

    An example of a valid JSON payload to the endpoint will be:
    ```
      {
        "text": "This is the first message to the PostIt app",
        "priority": "urgent"
      }
    ```
  * `GET` /api/group/:groupId/messages - Get group messages; gets all messages posted to group specified by groupId.
    groupId is part of the response returned when a group is created

  * `PUT` /api/user - Update a user.
    it takes one or more of the user properties. All properties can be modified with the exception of the username.
    A user can only update his/her profile

    An example of a valid JSON payload to the endpoint will be:
    ```
      {
        "email": "replit@code.org",
        "phoneNo": "2348181567460"
      }
    ```
  * `DELETE` /api/user - Delete a user.
    A user can only delete his/her account
  
  * `GET` /api/user/groups - Get a user's groups; gets all the groups a user belongs to.
    A user can only get his/her groups

  * `GET` /api/user/:username - Get a user by username

Development
-----------
The application was developed with [NodeJs](http://nodejs.org) and [Express](http://expressjs.com) is used for routing. The [Postgres](http://postgresql.com) database was used with [sequelize](http://sequelizejs.com) as the ORM

Installation
------------
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `https://github.com/tomipaul/PostIt`
3.  Change your directory `cd PostIt`
4.  Install all dependencies `npm install`
5.  Start the app `npm run start:dev` for development Or
6.  Run `npm start` to use transpiled code
7.  Use [postman](https://www.getpostman.com/) to consume the API

Tests
-----
*  The tests have been written using Mocha framework and Chai assertion library
*  Run the test with `npm test`

