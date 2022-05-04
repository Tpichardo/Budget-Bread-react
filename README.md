# Bread 🍞
Full Stack Budgeting Application that allows users to easily track their transactions
  - Integrated `Postgres` databse into `Express` API to allow users to save their transactions
  - Used `Firebase Authentication` to authenticate users

### [Front-end](https://save-your-bread.netlify.app/) 
### [Back-end](https://thawing-woodland-27640.herokuapp.com)


## Endpoints
| #      | Action      | URL                                   | HTTP Verb  | CRUD   | Description                                   |
| :----: | :----:      | :----:                                | :----:     | :----: | :----:                                        |
| 1      | Index       | /transactions?current_user_id=userId  | GET        | Read   | Get a list of the current user's transactions |
| 2      | Show        | /transactions/:id                     | GET        | Read   | Get an individual transaction                 |
| 3      | Create      | /transactions                         | POST       | Create | Create a new transaction                      |
| 4      | Destroy     | /transactions/:id                     | DELETE     | Delete | Delete a transaction                          |
| 5      | Update      | /transactions/:id                     | PUT        | Update | Update a transaction                          |

