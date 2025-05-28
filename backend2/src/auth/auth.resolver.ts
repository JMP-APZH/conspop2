import { Arg, Mutation, Query, Resolver, Ctx } from 'type-graphql';
import { AuthService } from './auth.service';
import { AuthPayload, RegisterInput, LoginInput, User } from './auth.types';
import { Context } from '../context';

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
}