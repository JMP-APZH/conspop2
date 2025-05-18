import { User } from '@prisma/client';

import { Role } from '@prisma/client';

export interface RegisterInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    nickname?: string;
    cityOfOrigin: string;
    currentCity: string;
  }

  // export enum UserRole {
  //   USER = 'USER',
  //   ADMIN = 'ADMIN'
  // }

  export interface JwtPayload {
    userId: string;
    role: Role;
    // possibility to add other claims that might be needed
  }

  export interface AuthUser {
    id: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname?: string | null;
  cityOfOrigin: string;
  currentCity: string;
  role: Role; // Use Prisma's enum directly
  }

//   export interface AuthUser extends Pick<User, 
//   'id' | 'email' | 'firstName' | 'lastName' | 'nickname' | 
//   'cityOfOrigin' | 'currentCity' | 'role'
// > {
//   // Add any additional fields not in Prisma model
// }