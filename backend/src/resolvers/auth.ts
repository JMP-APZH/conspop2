import { Resolver, Mutation, Arg } from "type-graphql";
import { RegisterInput, LoginInput, UserResponse, UserType } from "../schema/user";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Context } from "../types";

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

@Resolver()
export class AuthResolver {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: RegisterInput
  ): Promise<UserResponse> {
    // Validate email uniqueness
    const exists = await this.prisma.user.findUnique({
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
    @Arg("input") input: LoginInput
  ): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
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