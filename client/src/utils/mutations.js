import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password    
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook( $book: BookData!) {
    
    addBook( book: $book) {
    
      savedBooks {
          authors
          description
          bookId
          image
          title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: Int!) {
    removebook(bookId: $bookId) {
      _id
      authors
      description
      bookId
      image
      title
    }
  }
`;
