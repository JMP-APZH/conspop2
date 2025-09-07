import { Arg, Mutation, Query, Resolver, Ctx, UseMiddleware, Int } from 'type-graphql';
import { AuthService } from './auth.service';
import { AuthPayload, RegisterInput, LoginInput, User, UserVerification } from './auth.types';
import { Context } from '../context';
import { isAdmin, isAuth } from './auth.middleware';

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthPayload)
  async register(
    @Arg('input') input: RegisterInput
  ) {
    const prismaUser = await AuthService.register(input);
    const token = AuthService.generateToken(prismaUser);
    return { 
      token, 
      user: new User(prismaUser) // Now properly constructed
    };
  }

  @Mutation(() => AuthPayload)
  async login(
    @Arg('input') input: LoginInput
  ) {
    const prismaUser = await AuthService.login(input.email, input.password);
    const token = AuthService.generateToken(prismaUser);
    return { 
      token, 
      user: new User(prismaUser) // Now properly constructed
    };
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context) {
    if (!ctx.userId) return null;
    const prismaUser = await AuthService.getUserById(ctx.userId);
    return prismaUser ? new User(prismaUser) : null;
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isAdmin) // Requires admin privileges
  async users(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }

  @Query(() => Int)
@UseMiddleware(isAuth, isAdmin)
async totalUsersCount(@Ctx() ctx: Context): Promise<number> {
  return AuthService.getTotalUsersCount();
}

@Query(() => Int)
@UseMiddleware(isAuth, isAdmin)
async dailyActiveUsers(@Ctx() ctx: Context): Promise<number> {
  return AuthService.getDailyActiveUsers();
}

@Query(() => Int)
@UseMiddleware(isAuth, isAdmin)
async weeklyActiveUsers(@Ctx() ctx: Context): Promise<number> {
  return AuthService.getWeeklyActiveUsers();
}

@Query(() => UserVerification)
  // @UseMiddleware(isAuth) // Require authentication
  // async verifyUser(
  //   @Arg("userId") userId: string,
  //   @Ctx() ctx: Context
  // ) {
  //   // Allow if:
  //   // 1. User is requesting their own info (ctx.userId === userId), OR
  //   // 2. User is an ADMIN (ctx.userRole === 'ADMIN')
  //   if (ctx.userId !== userId && ctx.userRole !== 'ADMIN') {
  //     throw new Error("Unauthorized verification request");
  //   }

  async serviceVerifyUser(
    @Arg("userId") userId: string,
    @Arg("serviceToken") serviceToken: string
  ) {
    if (serviceToken !== process.env.SERVICE_SECRET) {
      throw new Error("Invalid service token");
    }

    const user = await AuthService.getUserById(userId);
    return {
      exists: !!user,
      email: user?.email,
      name: user ? `${user.firstName} ${user.lastName}` : undefined
    };
  }
}