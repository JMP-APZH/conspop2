import { ObjectType, Field, InputType } from 'type-graphql';
import { Role, User as PrismaUser } from '@prisma/client';

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

  @Field(() => Role, { nullable: true })
  role?: Role;
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

  @Field(() => Role)
  role: Role;

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