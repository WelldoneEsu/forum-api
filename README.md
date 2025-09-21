# Project Title
- forum-api

- ## 📖 Description
This module manages **comments and nested replies** on discussion threads. Users can:
- Comment on a thread.
- Reply to existing comments (supports infinite nesting).
- All actions require authentication via JWT.

---


## ✨ Features
- ✅ Add comments to threads
- ✅ Reply to other comments (nested comments)
- ✅ JWT-protected routes
- ✅ Linked to users and threads via Mongoose references
- 🧠 Efficient schema supporting recursive replies




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
| **Mongoose**  | MongoDB ORM                            |
| **JWT**       | Secure route protection                |



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

📘 API Endpoints – Comment Routes

## 1. Add a Comment to a Thread
POST /threads/:id/comments
🔁 Example in Postman
Method: POST
URL: http://localhost:4000/threads/<thread_id>/comments
Headers:
Authorization: Bearer <your_token>
Content-Type: application/json
Body (raw JSON):
{
  "content": "This is a comment from Postman!"
}

✅ Expected Response
{
  "_id": "652b...",
  "content": "This is a comment from Postman!",
  "author": "651a...",
  "thread": "6509...",
  "parentComment": null,
  "createdAt": "2025-09-21T...",
  "__v": 0
}

## 2. Reply to a Comment
➤ Endpoint
POST /comments/:id/reply
🔁 Example in Postman
Method: POST
URL: http://localhost:4000/comments/<parent_comment_id>/reply
Headers:
Authorization: Bearer <your_token>
Content-Type: application/json
Body (raw JSON):
{
  "content": "This is a reply to a comment!"
}

✅ Expected Response
{
  "message": "Reply added successfully",
  "reply": {
    "_id": "652b...",
    "content": "This is a reply to a comment!",
    "author": "651a...",
    "thread": "6509...",
    "parentComment": "652a...",
    "createdAt": "2025-09-21T...",
    "__v": 0
  }
}


## Author
Welldone Esu 

---

## Third commit and Push

git add .
git commit -m "feat: Implement nested comments"
git push origin -u main

## 📄 License
This project is licensed under the MIT License.
