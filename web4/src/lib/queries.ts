import { gql } from '@apollo/client';

export const ME_ROLE_QUERY = gql`
  query MeRole {
    me {
      role
      cityOfOrigin {
        id
      }
      currentCity {
        id
      }
    }
  }
`;

export const ME_FULL_QUERY = gql`
  query MeFull {
    me {
      id
      email
      firstName
      lastName
      nickname
      isDiaspora
      role
      createdAt
      cityOfOrigin {
        id
        name
        postalCode
      }
      currentCity {
        id
        name
        postalCode
      }
    }
  }
`;