import { Query, Resolver } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { Container } from "typedi";


// @Service()
// @Resolver()
// export class BaseQueryResolver {
//   @Query(() => String)
//   hello(): string {
//     return "Welcome to the Survey API!";
//   }

//   // Add other base queries if needed
//   // @Query(() => [UserType])
//   // async users(): Promise<UserType[]> {...}
// }

export class BaseQueryResolver {
    constructor(private prisma: PrismaClient) {}
  
    @Query(() => String, { description: "Simple health check" })
    hello(): string {
      return "Welcome to the Survey API!";
    }
  
    @Query(() => String, { description: "Check database connection" })
    async dbHealth(): Promise<string> {
      await this.prisma.$queryRaw`SELECT 1`;
      return "Database connection OK";
    }
  }

// Explicitly register in container
// Container.set(BaseQueryResolver, new BaseQueryResolver());