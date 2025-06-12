import { ObjectType, Field, InputType, registerEnumType } from 'type-graphql';
import { Role as PrismaRole, User as PrismaUser } from '@prisma/client';

// Register the Prisma enum with TypeGraphQL
registerEnumType(PrismaRole, {
  name: 'Role', // This name must match your GraphQL schema
  description: 'User roles',
});

@InputType()
export class RegisterInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field({ nullable: true })
  nickname?: string;

  @Field()
  cityOfOrigin!: string;

  @Field()
  currentCity!: string;

  @Field(() => PrismaRole, { nullable: true }) // Explicitly specify the enum type; Make role optional
  role?: PrismaRole;
}

@InputType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

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

  @Field(() => PrismaRole) // Explicitly specify the enum type
  role!: PrismaRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(user: PrismaUser) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.nickname = user.nickname || undefined;
    this.cityOfOrigin = user.cityOfOrigin;
    this.currentCity = user.currentCity;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

@ObjectType()
export class AuthPayload {
  @Field()
  token!: string;

  @Field(() => User)
  user!: User;
}

@ObjectType()
export class UserStats {
  @Field()
  totalUsersCount!: number;
  
  @Field()
  dailyActiveUsers!: number;
  
  @Field()
  weeklyActiveUsers!: number;
}