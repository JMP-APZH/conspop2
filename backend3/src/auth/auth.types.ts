import { ObjectType, Field, InputType, registerEnumType } from 'type-graphql';
import { Role as PrismaRole, User as PrismaUser, CityAgglomeration, MartiniqueCity as PrismaMartiniqueCity } from '@prisma/client';

// Register the Prisma enum with TypeGraphQL
registerEnumType(PrismaRole, {
  name: 'Role', // This name must match your GraphQL schema
  description: 'User roles',
});

registerEnumType(CityAgglomeration, {
  name: 'CityAgglomeration',
  description: 'City agglomeration types',
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
  isDiaspora!: boolean;

  @Field(() => CityInput)  // ✅ Changed to CityInput
  cityOfOrigin!: CityInput;

  @Field(() => CityInput)  // ✅ Changed to CityInput
  currentCity!: CityInput;

  @Field(() => PrismaRole, { nullable: true }) // Explicitly specify the enum type; Make role optional
  role?: PrismaRole;
}

@InputType()
export class CityInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  name?: string;
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
  isDiaspora: boolean;

  @Field(() => MartiniqueCity)
  cityOfOrigin: MartiniqueCity;

  @Field(() => MartiniqueCity)
  currentCity: MartiniqueCity;

  @Field(() => PrismaRole) // Explicitly specify the enum type
  role!: PrismaRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(user: PrismaUser & { cityOfOrigin: PrismaMartiniqueCity; currentCity: PrismaMartiniqueCity }) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.nickname = user.nickname || undefined;
    this.isDiaspora = user.isDiaspora;
    this.cityOfOrigin = new MartiniqueCity(user.cityOfOrigin);
    this.currentCity = new MartiniqueCity(user.currentCity);
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

@ObjectType()
export class UserVerification {
  @Field()
  exists: boolean = false;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;

// Optional: Add constructor for explicit initialization
  constructor(init?: Partial<UserVerification>) {
    Object.assign(this, {
      exists: false,
      ...init
    });
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

// Add queries for cities
@ObjectType()
export class CitiesResponse {
  @Field(() => [MartiniqueCity])
  cities!: MartiniqueCity[];

  @Field()
  totalCount!: number;
}