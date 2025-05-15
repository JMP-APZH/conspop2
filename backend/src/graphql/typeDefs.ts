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

  type AdminDashboardStats {
  totalUsers: Int!
  newUsersLast24h: Int!
  newUsersLast7d: Int!
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
    users: [User!]!
    user(id: ID!): User
    adminDashboardStats: AdminDashboardStats! @auth(requires: ADMIN)
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;