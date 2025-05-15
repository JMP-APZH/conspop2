export interface RegisterInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    nickname?: string;
    cityOfOrigin: string;
    currentCity: string;
  }

  export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }

  export interface JwtPayload {
    userId: string;
    role: UserRole;
    // possibility to add other claims that might be needed
  }

  export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    // ... other user fields that might be needed in context
  }