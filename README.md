# User Registration

## Project Overview: User Registartion

This project only where user can signup and signin theirselves:

### User Sign and Signup
1. User can sigup and sign with the plateform.

### Mail Notifications:

1. Users receive notifications via email for important updates such as course enrollment confirmations, Registration and forget password key.
2. Email notifications help in keeping users engaged and informed about platform activities.


## Installation
Install My Projects Using npm
```bash
    git clone https://github.com/amit-vis/ATG_User_registartion
    npm install
    cd ATG_User_registartion
```

## Running Test
To run tests, run the following command
```bash
    npm start
```

## Endpoints and Actions:
* /user/create: Create a new user.
* /user/login: Sign in into existing account.

* /token/create/:id: create the token for update the password.
* /token/update: set the password with the token.

## Folder Structure
* config
    - database.js
    - nodemailers.js
* controllers
    - home_controller.js
    - user_controller.js
    - token_controller.js
* models
    - user.js
    - token.js
* routes
    - index.js
    - user.js
    - token.js
- index.js
- .gitignore
- package-lock.json
- package.json