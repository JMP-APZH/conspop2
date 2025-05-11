export const typeDefs = `
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    cityOfOrigin: String!
    currentCity: String!
    createdAt: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    nickname: String
    cityOfOrigin: String!
    currentCity: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;