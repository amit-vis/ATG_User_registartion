# User Registration

## Project Overview: User Registartion

This is the social media websites where user can create the account and logged the account moreover they can create the post like the post, create the comment and like the comment:


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
    - limitter.js
    - nodemailers.js
    - passport-jwt.js
* controllers
    - comment_controller.js
    - home_controller.js
    - like_controller.js
    - post_controller.js
    - user_controller.js
    - reset_password_controller.js
* models
    - comment.js
    - like.js
    - post.js
    - user.js
    - token.js
    - user.js
* routes
    - comment.js
    - index.js
    - like.js
    - post.js
    - user.js
    - token.js
    - user.js
* uploads
    * postPath
- index.js
- .gitignore
- package-lock.json
- package.json