const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
  }

  type Comment {
    id: ID!
    text: String!
    author: User
    parentComment: Comment
  }

  type Thread {
    id: ID!
    title: String!
    comments: [Comment]
    author: User
  }

  type Query {
    threads: [Thread]
    thread(id: ID!): Thread
  }

  type Mutation {
    createThread(title: String!): Thread
    createComment(threadId: ID!, text: String!): Comment
    replyComment(commentId: ID!, text: String!): Comment
  }
`);

module.exports = schema;
