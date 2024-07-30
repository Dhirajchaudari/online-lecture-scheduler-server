import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import Fastify from "fastify";
import mercurius from "mercurius";
import { resolvers as typedResolvers } from "./resolvers/index.resolver"
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import Context from "./utils/context";
import { connectToDB } from "./utils/connectToDB";
import { verifyJwt } from "./utils/auth";
import { TokenType } from "./utils/jwt";

const app = Fastify({
  logger: false,
});

async function startServer() {
  try {
    await connectToDB();

    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
      resolvers: typedResolvers,
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Register Rate Limitter
    await app.register(import("@fastify/rate-limit"), {
      max: 100,
      timeWindow: 1000 * 60,
    });

    // Register CORS plugin
    await app.register(cors, {
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5000",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    });

    // Register cookie plugin
    await app.register(cookie, {
      secret: process.env.SECRET_KEY,
      parseOptions: {},
    });

    app.register(mercurius, {
      schema,
      queryDepth: 7,
      graphiql: true,
      context: async (request, reply) => {
        const context: Context = {
          req: request,
          rep: reply,
          role: undefined,
          user: undefined,
        };

        const cookie = request.cookies;

        if (cookie?.accessToken) {
          const user = verifyJwt<TokenType>(cookie?.accessToken);
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
  } catch (error: any) {
    console.error(error.message);
  }
}

startServer();
