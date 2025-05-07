import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { RegisterInput, LoginInput, UserResponse, UserType } from "../schema/user";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApolloContext } from "../types";
import { Service } from 'typedi';
import { AuthenticationError } from "apollo-server-errors";

// Helper function to convert Prisma User to GraphQL UserType
function toUserType(user: PrismaUser): UserType {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    nickname: user.nickname || undefined,
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
    @Ctx() { prisma }: ApolloContext // Destructure only what you need
  ): Promise<UserResponse> {
    const exists = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (exists) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(input.password, 12);

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

    const token = this.generateToken(user.id);

    return { 
      user: toUserType(user),
      token 
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") input: LoginInput,
    @Ctx() { prisma }: ApolloContext
  ): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      select: {
        id: true,
        email: true,
        password: true,
        // include other fields you need
    });

    if (!user) throw new AuthenticationError("Invalid credentials");

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) throw new AuthenticationError("Invalid credentials");

    const token = this.generateToken(user.id);

    return {
      user: toUserType(user),
      token
    };
  }

  @Mutation(() => UserResponse)
  async refreshToken(
    @Ctx() { prisma, user }: ApolloContext
  ): Promise<UserResponse> {
    if (!user) {
      throw new AuthenticationError("Not authenticated");
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        nickname: true,
        cityOfOrigin: true,
        currentCity: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!currentUser) {
      throw new AuthenticationError("User no longer exists");
    }

    return {
      user: toUserType(currentUser),
      token: this.generateToken(currentUser.id)
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