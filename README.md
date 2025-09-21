# Project Title
- forum-api

- ## 📖 Description
A RESTful API for a forum application, allowing users to create threads, comment on threads, and vote on threads and comments. The API also includes admin moderation features and a GraphQL endpoint.

---


## ✨ Features
🗳️ Voting System
- Upvote or downvote threads and comments
- Prevent duplicate votes by the same user
- Vote tracking stored per user per post/comment

🛡️ Admin Moderation
- View all threads
- Delete inappropriate/spam comments
- Delete any thread (admin-only access)
- Role-based access via middleware (roleCheck('admin'))

⚡ GraphQL API
- Query all threads or a single thread with comments
- Create new threads and comments
- Reply to existing comments
- Built using express-graphql
- GraphiQL playground enabled for testing

## Installation
- 
git clone https://yourusername/forum-api.git
cd project-folder

npm install


 ## Usage 
 npm start


# Start your server
npm run dev
node server.js



🛠️ Technologies Used
- Node.js  -	JavaScript runtime for building the server.
- Express.js - Web framework for handling routes and middleware.
- MongoDB	NoSQL - database for storing threads, comments, votes.
- Mongoose -  ODM for MongoDB – schema modeling and DB access.
- JWT	- JSON Web Tokens for user authentication.
- Bcrypt - Password hashing (if auth system included).
- express-graphql	- Middleware for setting up a GraphQL endpoint.
- GraphQL	- Query language for APIs (bonus feature).
- Dotenv - Environment variable management.
- Nodemon	- Development tool for auto-restarting the server.
- Postman – for testing API endpoints.
- ESLint + Prettier – for code quality and formatting.



⚙️ Environment Variables
## Create a .env file in the root directory with:

- PORT=4000
- MONGO_URI=mongodb://localhost:27017/forum-api
- JWT_SECRET=your-secret


✅ Deliverables
✅ Voting system (threads & comments)
✅ Admin moderation routes
✅ Updated documentation
✅ (Bonus) GraphQL endpoint



📁 Project Structure
forum-api/
├── config/
│   └── db.js                        # MongoDB connection setup
│
├── controllers/
│   ├── adminController.js          # Handles admin moderation actions
│   ├── authController.js           # Handles login/register (if applicable)
│   ├── commentController.js        # Handles comment CRUD and voting
│   └── threadController.js         # Handles thread CRUD and voting
│
├── graphql/
│   ├── schema.js                   # GraphQL schema definitions
│   └── resolvers.js                # GraphQL resolvers for queries/mutations
│
├── middleware/
│   ├── auth.js                     # Authentication and role-check middleware
│   └── errorHandler.js             # (Optional) Centralized error handler
│
├── models/
│   ├── Thread.js                   # Thread model schema
│   ├── Comment.js                  # Comment model schema
│   ├── Vote.js                     # Vote tracking model
│   └── User.js                     # User model (for login, roles, etc.)
│
├── routes/
│   ├── admin.js                    # Admin routes (moderation)
│   ├── comments.js                 # Routes for comment voting
│   ├── threads.js                  # Routes for thread voting
│   └── auth.js                     # Auth routes (register/login)
│
│
├── .env                            # Environment variables (e.g. DB URI, JWT secret)
├── .gitignore                      # Ignore node_modules, .env, etc.
├── app.js                          # Express app initialization
├── server.js                       # Main entry – connects DB & starts server
├── package.json                    # Project metadata, dependencies, scripts
├── package-lock.json               # Exact version lock for dependencies
└── README.md                       # 📘 Project documentation


## 🔐 Authentication & Authorization

- All voting routes require user authentication.
- Admin routes are protected using `authorizeRole('admin')` middleware.
- Example middleware located in `middleware/authMiddleware.js`.



## 📘 API Endpoints – Thread Routes

> Base URL: `/threads`  
> All secure routes require the `Authorization` header:
Authorization: Bearer <jwt_token>


---

### 📌 `POST /threads`
**Create a new thread**
- 🔐 Requires authentication
#### Request Body:
`json
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

🧾 Voting API Endpoints
Method	Endpoint	Description	Auth Required
POST	/threads/:id/vote	Upvote/downvote a thread	✅
POST	/comments/:id/vote	Upvote/downvote a comment	✅
Example Request:
POST /threads/613b1c/vote
Authorization: Bearer <token>
Content-Type: application/json

{
  "vote": 1 // or -1
}

Response:

{
  "message": "Vote cast successfully"
}

🛡️ Admin API Endpoints
Method	Endpoint	Description	Admin Only
GET	/admin/threads	Get all threads	✅
DELETE	/admin/comments/:id	Delete a comment	✅


⚡ GraphQL Endpoint
URL	Description
/graphql	Access GraphQL playground
✅ Example Queries
# Get all threads
query {
  threads {
    id
    title
    author {
      name
    }
    comments {
      id
      text
    }
  }
}

# Get a single thread
query {
  thread(id: "6140abc123") {
    title
    comments {
      text
      author {
        name
      }
    }
  }
}

✅ Example Mutations
# Create thread
mutation {
  createThread(title: "New Thread") {
    id
    title
  }
}

# Create comment
mutation {
  createComment(threadId: "6140abc123", text: "This is a comment") {
    id
    text
  }
}

🧪 GraphiQL is enabled, so you can test your queries at http://localhost:PORT/graphql

🛠️ Setup Instructions (Extra for GraphQL/Voting/Admin)
# Install GraphQL
npm install express-graphql graphql

# Start your server
npm run dev
node server.js

📂 Related Files
Feature	Files
Voting	voteController.js, Vote.js, vote routes
Admin	adminController.js, adminRoutes.js
GraphQL	graphql/schema.js, graphql/resolvers.js


## Author
Welldone Esu 

---

## commit and Push

git add .
git commit -m "docs: update README with detailed project structure and setup instructions"
git push origin -u main

## 📄 License
This project is licensed under the MIT License.
