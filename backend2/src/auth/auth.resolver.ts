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
    const user = await AuthService.register(input);
    const token = AuthService.generateToken(user);
    return { token, user };
  }

  @Mutation(() => AuthPayload)
  async login(
    @Arg('input') input: LoginInput
  ) {
    const user = await AuthService.login(input.email, input.password);
    const token = AuthService.generateToken(user);
    return { token, user };
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context) {
    if (!ctx.userId) return null;
    const user = await AuthService.getUserById(ctx.userId);
    return user ? new User(user) : null;
  }
}