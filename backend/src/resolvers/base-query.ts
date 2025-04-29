import { Query, Resolver } from "type-graphql";

@Resolver()
export class BaseQueryResolver {
  @Query(() => String)
  hello(): string {
    return "Welcome to the Survey API!";
  }

  // Add other base queries if needed
  // @Query(() => [UserType])
  // async users(): Promise<UserType[]> {...}
}