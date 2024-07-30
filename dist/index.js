"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const schema_1 = require("@graphql-tools/schema");
const fastify_1 = __importDefault(require("fastify"));
const mercurius_1 = __importDefault(require("mercurius"));
const index_resolver_1 = require("./resolvers/index.resolver");
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const connectToDB_1 = require("./utils/connectToDB");
const auth_1 = require("./utils/auth");
const app = (0, fastify_1.default)({
    logger: false,
});
async function startServer() {
    try {
        await (0, connectToDB_1.connectToDB)();
        const { typeDefs, resolvers } = await (0, type_graphql_1.buildTypeDefsAndResolvers)({
            resolvers: index_resolver_1.resolvers,
        });
        const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
        // Register Rate Limitter
        await app.register(Promise.resolve().then(() => __importStar(require("@fastify/rate-limit"))), {
            max: 100,
            timeWindow: 1000 * 60,
        });
        // Register CORS plugin
        await app.register(cors_1.default, {
            origin: [
                "http://localhost:3000",
                "http://localhost:3001",
                "http://localhost:5000",
            ],
            methods: ["GET", "POST"],
            credentials: true,
        });
        // Register cookie plugin
        await app.register(cookie_1.default, {
            secret: process.env.SECRET_KEY,
            parseOptions: {},
        });
        app.register(mercurius_1.default, {
            schema,
            queryDepth: 7,
            graphiql: true,
            context: async (request, reply) => {
                const context = {
                    req: request,
                    rep: reply,
                    role: undefined,
                    user: undefined,
                };
                const cookie = request.cookies;
                if (cookie?.accessToken) {
                    const user = (0, auth_1.verifyJwt)(cookie?.accessToken);
                    context.user = user?.user;
                    context.role = user?.role;
                }
                return context;
            },
            errorFormatter: (result, context) => {
                const message = result.errors[0]?.message || "An error occurred";
                return {
                    statusCode: 200,
                    response: {
                        data: null,
                        errors: [{ message }],
                    },
                };
            },
        });
        // Register routes
        app.get("/", async (req, res) => {
            res.status(200).send(`Healthcheck Pass`);
        });
        app.setErrorHandler(function (error, request, reply) {
            reply.send(error);
        });
        const port = parseInt(process.env.PORT || "4000", 10);
        await app.listen({
            port,
            host: "0.0.0.0", // Bind to all network interfaces
        });
        console.log(`Server started on http://localhost:${process.env.PORT} 🚀`);
    }
    catch (error) {
        console.error(error.message);
    }
}
startServer();
