import fastifyJwt from "@fastify/jwt";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyPlugin from "fastify-plugin";

async function Auth(server: FastifyInstance, options: FastifyPluginOptions): Promise<void> {
  await server.register(fastifyJwt, {
    secret: "Hello123",
    sign: {
      expiresIn: "15m",
    },
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        reply.code(401).send(error);
      }
    }
  );
}

export default fastifyPlugin(Auth);
