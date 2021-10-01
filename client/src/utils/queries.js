import { gql } from '@apollo/client';

// export const QUERY_USER = gql`
//   query user {
//     user {
//       _id
//       username
//       savedBooks {
//         _id
//         title
//         description
//       }
//     }
//   }
// `;

export const QUERY_ME = gql`
 {
    me {
      _id
      username
      savedBooks {
        _id
        title
        description
      }
    }
  } 
`;