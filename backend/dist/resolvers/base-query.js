"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQueryResolver = void 0;
const type_graphql_1 = require("type-graphql");
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
class BaseQueryResolver {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    hello() {
        return "Welcome to the Survey API!";
    }
    async dbHealth() {
        await this.prisma.$executeRaw `SELECT 1`;
        return "Database connection OK";
    }
}
exports.BaseQueryResolver = BaseQueryResolver;
__decorate([
    (0, type_graphql_1.Query)(() => String, { description: "Simple health check" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], BaseQueryResolver.prototype, "hello", null);
__decorate([
    (0, type_graphql_1.Query)(() => String, { description: "Check database connection" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseQueryResolver.prototype, "dbHealth", null);
// Explicitly register in container
// Container.set(BaseQueryResolver, new BaseQueryResolver());
