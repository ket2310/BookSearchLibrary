const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String
    title: String
  }

  type User {
      _id: ID
      username: String
      email: String
      password: String
      savedBooks: [Book]
  }
  
  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
      users: [User]
      # user(_id: ID!): User
      user(userId: ID!): User
  }

  type Mutation {
      # Set up mutations to handle creating a profile or logging into a profile and return Auth type
      addUser(username: String!, email: String!, password: String!): Auth
      addBook(userId: ID!, book: String!): User
      
      login(email: String!, password: String!): Auth
      
      removeBook(profileId: ID!, book: String!): User
  }
`;

module.exports = typeDefs;
