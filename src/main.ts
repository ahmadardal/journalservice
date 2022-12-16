import fastify, { FastifyInstance } from "fastify";
import AuthService from "./AuthService/auth.index";
import Auth from "./Utilities/auth";
import database, { Db } from "./Utilities/db";
import environment from "./Utilities/environment";
import fastifySwagger from "@fastify/swagger";
import swaggerOptions from "./Utilities/swagger";
import fastifySwaggerUi = require("@fastify/swagger-ui");
import ContentService from "./ContentService/content.index";

declare module "fastify" {
  interface FastifyRequest {
    db: Db;
  }

  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: { name: string; email: string; userId: string, iat: number, exp: number }
  }
}

const server: FastifyInstance = fastify({ logger: true });

async function start() {
  await server.register(database);

  await server.register(Auth);

  await server.register(fastifySwagger);
  await server.register(fastifySwaggerUi, swaggerOptions);

  await server.register(AuthService);
  await server.register(ContentService);

  server.listen(
    { port: environment.PORT, host: "0.0.0.0" },
    (error: Error | null, address: string) => {
      if (error) {
        // Om error inte är null, då har vi ett fel.
        server.log.error({
          name: error.name,
          message: error.message,
          cause: error.cause,
          stack: error.stack,
        });
        process.exit(1);
      }

      server.swagger();

      console.log("=================================");
      console.log(`======= ENV: ${environment.NODE_ENV} =======`);
      console.log(`🚀 App listening on ${address}`);
      console.log("=================================");
    }
  );
}

start();
