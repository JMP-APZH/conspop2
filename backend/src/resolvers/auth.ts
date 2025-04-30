import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { RegisterInput, LoginInput, UserResponse, UserType } from "../schema/user";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { ApolloContext } from "../types"; // Import your interface
import { Service } from 'typedi';
import { AuthenticationError } from "apollo-server-errors";

// Helper function to convert Prisma User to GraphQL UserType
function toUserType(user: PrismaUser): UserType {
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

@Service()
@Resolver()
export class AuthResolver {
  constructor(private prisma: PrismaClient) {}

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() ctx: ApolloContext // context parameter
  ): Promise<UserResponse> {
    // You can now access ctx.prisma (though constructor injection is preferred)
    // Validate email uniqueness
    const exists = await ctx.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (exists) throw new Error("Email already in use");

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        nickname: input.nickname,
        cityOfOrigin: input.cityOfOrigin,
        currentCity: input.currentCity
      },
    });

    // Generate JWT
    const token = this.generateToken(user.id);

    return { 
      user: toUserType(user), // Convert to GraphQL type
      token 
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") input: LoginInput,
    @Ctx() ctx: ApolloContext // context parameter
  ): Promise<UserResponse> {
    const user = await ctx.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = this.generateToken(user.id);

    return {
      user: toUserType(user), // Convert to GraphQL type
      token
    };
  }

  private generateToken(userId: string): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable not set");
    }

    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }
}

// Explicitly register in container
// Container.set(AuthResolver, new AuthResolver());
// Container.set(AuthResolver, new AuthResolver());