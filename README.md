# Project Title
- forum-api

- ## 📖 Description
This module is part of the `forum-api` project and handles all operations related to discussion threads. Users can create, view, and delete threads. Admins have special privileges to remove any thread. Each thread supports nested comments for a fully interactive forum experience.

---


## ✨ Features

- ✅ Create new discussion threads
- ✅ View all threads with user info
- ✅ View single thread with deeply nested comments
- ✅ Delete threads (admin-only)
- 🔒 JWT-based route protection for secure access


## Installation
- 
git clone https://<yourusername>/forum-api.git
cd project-folder
npm install

 ## Usage 
 npm start


## Technologies Used
| **Node.js**   | Runtime environment                    |
| **Express**   | Web framework                          |
| **MongoDB**   | NoSQL database                         |
| **Mongoose**  | ODM for MongoDB                        |
| **JWT**       | Authentication and authorization       |
| **bcrypt**    | Password hashing                       |
| **dotenv**    | Environment variable management        |


## 📘 API Endpoints – Thread Routes

> Base URL: `/threads`  
> All secure routes require the `Authorization` header:
Authorization: Bearer <jwt_token>


---

### 📌 `POST /threads`
**Create a new thread**
- 🔐 Requires authentication
#### Request Body:
```json
{
  "title": "Example Thread",
  "content": "This is the thread body."
}

Response:

201 Created – Thread created

401 Unauthorized – Missing/invalid token

📌 GET /threads

Get all threads

Response:
[
  {
    "_id": "614...",
    "title": "First Thread",
    "content": "Hello world",
    "author": {
      "_id": "abc123",
      "name": "Jane Doe"
    }
  }
]

📌 /threads/:id

Get a specific thread with nested comments

Response:
{
  "_id": "614...",
  "title": "Sample Thread",
  "content": "Thread content",
  "author": { "name": "Jane" },
  "comments": [
    {
      "_id": "comment1",
      "content": "Top level comment",
      "author": { "name": "Kim" },
      "replies": [
        {
          "_id": "comment2",
          "content": "Reply to top level",
          "author": { "name": "Anna" },
          "replies": [ ... ]
        }
      ]
    }
  ]
}

200 OK – Full thread with comments
404 Not Found – Thread not found

📌 DELETE /threads/:id
Delete a thread
🔐 Requires authentication
🛡️ Requires admin role
Response:

200 OK – Thread deleted
403 Forbidden – Not an admin
404 Not Found – Thread doesn't exist

## Author
Welldone Esu 

---

## Second commit and Push

git add .
git commit -m "feat: add thread creation routes"
git push origin -u main

## 📄 License
This project is licensed under the MIT License.
