"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express"); // Changed from apollo-server
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const auth_1 = require("./resolvers/auth");
const base_query_1 = require("./resolvers/base-query");
const typedi_1 = require("typedi");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const user_queries_1 = require("./resolvers/user-queries");
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
// Verify required environment variables
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
}
const prisma = new client_1.PrismaClient();
// Register instances for dependency injection
typedi_1.Container.set(client_1.PrismaClient, prisma);
typedi_1.Container.set(base_query_1.BaseQueryResolver, new base_query_1.BaseQueryResolver(typedi_1.Container.get(client_1.PrismaClient)));
typedi_1.Container.set(auth_1.AuthResolver, new auth_1.AuthResolver(typedi_1.Container.get(client_1.PrismaClient)));
typedi_1.Container.set(user_queries_1.UserQueries, new user_queries_1.UserQueries(typedi_1.Container.get(client_1.PrismaClient)));
async function bootstrap() {
    const app = (0, express_1.default)();
    // Security middleware
    app.use((0, helmet_1.default)());
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    }));
    // CORS configuration
    app.use((0, cors_1.default)({
        origin: [
            'http://localhost:3000', // Your Next.js frontend
            'https://studio.apollographql.com' // GraphQL IDE
        ],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'OPTIONS']
    }));
    try {
        // Build TypeGraphQL schema
        const schema = await (0, type_graphql_1.buildSchema)({
            resolvers: [auth_1.AuthResolver, base_query_1.BaseQueryResolver, user_queries_1.UserQueries],
            container: typedi_1.Container,
            validate: true,
        });
        // Create Apollo Server
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req }) => {
                const authHeader = req.headers.authorization || '';
                const token = authHeader.replace('Bearer ', '');
                const ctx = {
                    prisma,
                    user: null // Now matches the interface
                };
                if (token) {
                    try {
                        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                        ctx.user = decoded; // Now properly typed
                    }
                    catch (error) {
                        console.warn('Invalid token:', error);
                        // user remains null
                    }
                }
                return ctx;
            },
            introspection: process.env.NODE_ENV !== "production",
            formatError: (error) => {
                console.error(error);
                return error;
            }
        });
        await server.start();
        // Apply Apollo middleware to express
        server.applyMiddleware({
            app,
            cors: false // Disable Apollo's built-in CORS since we're using express cors
        });
        // Start server
        app.listen(4000, () => {
            console.log(`🚀 Server running at http://localhost:4000${server.graphqlPath}`);
        });
        process.on("SIGTERM", async () => {
            await prisma.$disconnect();
            process.exit(0);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}
bootstrap();
