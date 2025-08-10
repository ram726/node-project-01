# Node.js User CRUD API

This project is a simple RESTful API built with Express.js for managing user data.  
It supports creating, reading, updating, deleting users, searching, and removing duplicates.

## Features

- Get all users (`GET /api/users`)
- Get user by ID (`GET /api/users/:id`)
- Search users by keyword (`GET /api/users/search/:keyword`)
- Create a new user (`POST /api/user`)
- Update a user (`PUT /api/users/:id`)
- Delete a user (`DELETE /api/users/:id`)
- Remove duplicate users (`DELETE /api/delete/duplicateUsers`)
- View users in HTML table (`GET /users`)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/ram726/node-project-01.git
   cd node-project-01
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   The server will run at [http://localhost:8000](http://localhost:8000).

## API Endpoints

| Method | Endpoint                          | Description                       |
|--------|-----------------------------------|-----------------------------------|
| GET    | `/api/users`                      | Get all users (JSON)              |
| GET    | `/users`                          | Get all users (HTML table)        |
| GET    | `/api/users/:id`                  | Get user by ID                    |
| GET    | `/api/users/search/:keyword`      | Search users by keyword           |
| POST   | `/api/user`                       | Create a new user                 |
| PUT    | `/api/users/:id`                  | Update a user                     |
| DELETE | `/api/users/:id`                  | Delete a user                     |
| DELETE | `/api/delete/duplicateUsers`      | Remove duplicate users            |

## Example Usage with Postman

> **Add screenshots below to show API requests and responses using Postman.**
>
> ![Postman Screenshot - Get Users](screenshots)
> <img width="1446" height="952" alt="image" src="https://github.com/user-attachments/assets/d557eb3b-46a7-4fc2-bb73-bc3495a0ace1" />
<img width="1471" height="933" alt="image" src="https://github.com/user-attachments/assets/6e706350-51ac-4936-97eb-7801d531cd24" />
<img width="1462" height="657" alt="image" src="https://github.com/user-attachments/assets/2df71db2-6ee1-4fb0-9723-59459ef670fb" />
<img width="1491" height="914" alt="image" src="https://github.com/user-attachments/assets/72b43a94-1b57-4fe9-8b10-e90552d0beab" />


> ![Postman Screenshot - Create User](screenshots)
> <img width="1441" height="732" alt="image" src="https://github.com/user-attachments/assets/a5f73a37-3623-4a50-975e-5d0687f86da9" />
> 
> ![Postman Screenshot - Update User](screenshots/update-user.png)
> <img width="1481" height="693" alt="image" src="https://github.com/user-attachments/assets/fda8836e-df07-4573-a93e-a42ce45466d1" />
> 
> ![Postman Screenshot - Delete User](screenshots/delete-user.png)
>>
> <img width="1478" height="757" alt="image" src="https://github.com/user-attachments/assets/e3303f71-9d29-4f69-841e-668850c1e77b" />
<img width="1488" height="614" alt="image" src="https://github.com/user-attachments/assets/11a058bf-b5d0-4a0d-88b5-140f5486794b" />




## Notes

- User data is stored in `MOCK_DATA.json`.
- Duplicate users are identified by matching `first_name`, `last_name`, and `email`.

---

Feel free to contribute or raise issues!
