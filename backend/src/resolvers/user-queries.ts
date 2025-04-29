import { Query, Resolver, Arg } from "type-graphql";
import { Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import { UserType } from "../schema/user";

import { Container } from "typedi";

@Resolver()
@Service()
export class UserQueries {
  constructor(private prisma: PrismaClient) {}

  @Query(() => [UserType])
  async users(): Promise<UserType[]> {
    return this.prisma.user.findMany();
  }

  @Query(() => UserType, { nullable: true })
  async user(@Arg("id") id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

// Explicitly register in container
// Container.set(UserQueries, new UserQueries());
// Container.set(UserQueries, new UserQueries());