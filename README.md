# Bread 🍞
Budgeting Application that allows users to easily track their transactions
  - Created a full-stack application with CRUD functionality using `Express` on the backend and `React` on the frontend
  - Integrated `Postgres` database into `Express` API to allow users to save their transactions
  - Used `Firebase Authentication` to authenticate users

### [Front-end](https://save-your-bread.netlify.app/) | [Back-end](https://thawing-woodland-27640.herokuapp.com)

## Front-end Routes

| #      | Action      | URL                                     | HTTP Verb  | CRUD   | Description                                   |
| :----: | :----:      | :----:                                  | :----:     | :----: | :----:                                        |
| 1      | Index       | /transactions                           | GET        | Read   | Get a list of the current user's transactions |
| 2      | Show        | /transactions/:id                       | GET        | Read   | Get an individual transaction                 |
| 3      | New         | /transactions/new                       | POST       | Create | Get a form to create a new transaction        |
| 4      | Edit        | /transactions/:id/edit                  | PUT        | Update | Get a form to edit a transaction              |
| 5      | Delete      | /transactions/:id                       | DELETE     | Delete | Delete a transaction                          |

## API endpoints
| #      | Action      | URL                                     | HTTP Verb  | CRUD   | Description                                   |
| :----: | :----:      | :----:                                  |   :----:   | :----: | :----:                                        |
| 1      | Index       | /transactions?current_user_id={userId}  | GET        | Read   | Get a list of the current user's transactions |
| 2      | Show        | /transactions/:id                       | GET        | Read   | Get an individual transaction                 |
| 3      | Create      | /transactions                           | POST       | Create | Create a new transaction                      |
| 4      | Update      | /transactions/:id                       | PUT        | Update | Update a transaction                          |
| 5      | Destroy     | /transactions/:id                       | DELETE     | Delete | Delete a transaction                          |


