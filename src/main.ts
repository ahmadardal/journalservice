import fastify, { FastifyInstance } from "fastify";
import AuthService from "./AuthService/auth.index";
import Auth from "./Utilities/auth";
import database, { Db } from "./Utilities/db";

declare module "fastify" {
  interface FastifyRequest {
    db: Db;
  }

  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

const server: FastifyInstance = fastify({ logger: true });
const port = 3000;

async function start() {
  await server.register(database);

  await server.register(Auth);

  await server.register(AuthService);

  server.listen(
    { port: port, host: "0.0.0.0" },
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

      console.log("=================================");
      console.log(`======= ENV: DEV =======`);
      console.log(`======= BASE_URL: ${address} =======`);
      console.log(`🚀 App listening on the port ${port}`);
      console.log("=================================");
    }
  );
}

start();
