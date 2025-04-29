import { Field, InputType, ObjectType } from "type-graphql";
import { User as PrismaUser } from '@prisma/client';

import { IsEmail, MinLength, MaxLength } from 'class-validator';

// 1. First define UserType
@ObjectType()
export class UserType {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  // @Field({ nullable: true })
  // nickname?: string;

  @Field(() => String, { nullable: true })
  nickname?: string | null; // Add null to the type

  @Field()
  cityOfOrigin: string;

  @Field()
  currentCity: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

// 2. Then add the conversion function right after
export function toUserType(user: PrismaUser): UserType {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    nickname: user.nickname || undefined, // Convert null to undefined
    cityOfOrigin: user.cityOfOrigin,
    currentCity: user.currentCity,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

// 3. Then define UserResponse (which depends on UserType)
@ObjectType()
export class UserResponse {
  @Field(() => UserType, { nullable: true })
  user?: UserType;

  @Field(() => String, { nullable: true })
  token?: string;
}

// 4. Input types can go at the end
@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field()
  cityOfOrigin: string;

  @Field()
  currentCity: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}