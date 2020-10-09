# feelingsOverflow.

### stackOverflow, but for your feelings.

What is among one of the most important tools in the life of any software engineer? StackOverflow, of course! What if we had that same level of community discourse and commitment to problem solving not just for fixing bugs in your code, but for helping sort through the myriad emotional difficulties that confront us daily! That's what feelingsOverflow is all about: a forum-based app in the style of stackOverflow, but catered towards helping people sort through difficult emotional issues.

Check out the live page here: [feelingsOverflow](https://feelings-overflow-app.herokuapp.com/ "feelingsOverflow")

## Getting Started

### Prerequisites

Ensure you React, Ruby, and Rails installed.

### Installation

1. Fork and clone [backend repo](https://github.com/Jeff-Adler/feelingsOverflow-back-end "Backend Repo")

2. From your terminal, enter:

```
cd feelingsOverflow_backend
bundle install
```

3. Fork and clone this (frontend) repo

4. From terminal (preferably in another tab), enter:

```
cd feelingsOverflow_frontend
npm install
```

5. From backend terminal tab, enter:

```
rails db:create
rails db:migrate
rails db:seed //seeds database
rails s //runs Rails server
```

6. From frontend terminal tab, enter:

```
npm start //runs React server
//If there is a message that port 3000 is occupied:
Y //press Enter
```

## Usage

1. Click 'New here? Sign up!'

![login](./screenshots/login.png?raw=true "login")

2. Fill out your personal information. Note: Username and Password must be between 6 and 20 characters.

![signup](./screenshots/signup.png?raw=true "signup")

3. Navigate with the navbar (if that wasn't obvious :P)

![navbar](./screenshots/navbar.png?raw=true "navbar")

4. From the Home page, view the most recent posts from all users.

![posts](./screenshots/posts.png?raw=true "posts")

5. Search posts by title or description, and toggle sort by category.

![search](./screenshots/search.png?raw=true "search")

6. Click 'What's on your mind' to fill out a form and create a new post!

![post_submit](./screenshots/post_submit.png?raw=true "post_submit")
![post_form](./screenshots/post_form.png?raw=true "post_form")

7. Click a post to navigate to its show page. View comments, vote on comments, and submit a comment!

![post_page](./screenshots/post_page.png?raw=true "post_page")
![comment_page](./screenshots/comment_page.png?raw=true "comment_page")
![comment_form](./screenshots/comment_form.png?raw=true "comment_form")

8. Click on the 'My Posts' tab in the navbar to see all the posts you've created.

![my_posts](./screenshots/my_posts.png?raw=true "my_posts")

9. Click on any of your own posts to edit or delete the post.

![my_posts](./screenshots/my_posts.png?raw=true "my_posts")
![my_post_page](./screenshots/my_post_page.png?raw=true "my_post_page")

10. From the 'Account' tab, view information about your profile, your stats, as well as logout.

![account_info](./screenshots/account_info.png?raw=true "account_info")
![stats](./screenshots/stats.png?raw=true "stats")

# Built With

- React
- Javascript
- Ruby on Rails
- PostgreSQL
- ActiveRecord
- Bootstrap
- React-Strap

## React/Javascript Libraries

bootstrap
react-bootstrap
reactstrap

## Ruby Gems

(standard Rails gems)

# Authors

Me, Jeff Adler!
[Cathy D'Onofrio](https://github.com/catd825 "Cathy D'Onofrio")

# Acknowledgements

As always, this project would have been made nigh impossible without the amazing community of people who built the packages, gems, and libraries listed above!
