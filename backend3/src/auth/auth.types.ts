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

// MARTINIQUE CITY CLASS DEFINITION
@ObjectType()
export class MartiniqueCity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  postalCode: string;

  @Field(() => CityAgglomeration)
  agglomeration: CityAgglomeration;

  @Field()
  population: number;

  constructor(city: any) {
    this.id = city.id;
    this.name = city.name;
    this.postalCode = city.postalCode;
    this.agglomeration = city.agglomeration;
    this.population = city.population;
  }
}

@InputType()
export class CityInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class DiasporaLocationInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  country?: string;
}


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

  @Field(() => DiasporaLocationInput, { nullable: true }) // Use DiasporaLocationInput
  diasporaLocation?: DiasporaLocationInput;


  @Field(() => PrismaRole, { nullable: true }) // Explicitly specify the enum type; Make role optional
  role?: PrismaRole;
}

@ObjectType()
export class DiasporaLocation {
  @Field()
  id: string;

  @Field()
  country: string;

  @Field()
  countryCode: string;

  @Field({ nullable: true })
  region?: string;

  constructor(location: any) {
    this.id = location.id;
    this.country = location.country;
    this.countryCode = location.countryCode;
    this.region = location.region || undefined;
  }
}

@InputType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  profileImage?: string;
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

  @Field({ nullable: true }) // Add this field
  profileImage?: string;

  @Field()
  isDiaspora: boolean;

  @Field(() => MartiniqueCity)
  cityOfOrigin: MartiniqueCity;

  @Field(() => MartiniqueCity)
  currentCity: MartiniqueCity;

  @Field(() => DiasporaLocation, { nullable: true }) // Add this field
  diasporaLocation?: DiasporaLocation;

  @Field(() => PrismaRole) // Explicitly specify the enum type
  role!: PrismaRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(user: PrismaUser & { cityOfOrigin: PrismaMartiniqueCity; currentCity: PrismaMartiniqueCity, diasporaLocation?: any; }) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.nickname = user.nickname || undefined;
    this.profileImage = user.profileImage || undefined;
    this.isDiaspora = user.isDiaspora;
    this.cityOfOrigin = new MartiniqueCity(user.cityOfOrigin);
    this.currentCity = new MartiniqueCity(user.currentCity);
    this.diasporaLocation = user.diasporaLocation ? new DiasporaLocation(user.diasporaLocation) : undefined;
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