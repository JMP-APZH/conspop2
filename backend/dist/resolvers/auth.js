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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_1 = require("../schema/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typedi_1 = require("typedi");
const apollo_server_errors_1 = require("apollo-server-errors");
// Helper function to convert Prisma User to GraphQL UserType
function toUserType(user) {
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
let AuthResolver = class AuthResolver {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(input, { prisma } // Destructure only what you need
    ) {
        const exists = await prisma.user.findUnique({
            where: { email: input.email },
        });
        if (exists)
            throw new Error("Email already in use");
        const hashedPassword = await bcryptjs_1.default.hash(input.password, 12);
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
    async login(input, { prisma }) {
        const user = await prisma.user.findUnique({
            where: { email: input.email },
            select: {
                id: true,
                email: true,
                password: true,
                // include other fields you need
            }
        });
        if (!user)
            throw new apollo_server_errors_1.AuthenticationError("Invalid credentials");
        const valid = await bcryptjs_1.default.compare(input.password, user.password);
        if (!valid)
            throw new apollo_server_errors_1.AuthenticationError("Invalid credentials");
        const token = this.generateToken(user.id);
        return {
            user: toUserType(user),
            token
        };
    }
    async refreshToken({ prisma, user }) {
        if (!user) {
            throw new apollo_server_errors_1.AuthenticationError("Not authenticated");
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
            throw new apollo_server_errors_1.AuthenticationError("User no longer exists");
        }
        return {
            user: toUserType(currentUser),
            token: this.generateToken(currentUser.id)
        };
    }
    generateToken(userId) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable not set");
        }
        return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.UserResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "refreshToken", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [Object])
], AuthResolver);
