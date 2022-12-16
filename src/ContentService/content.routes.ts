import { FastifyInstance, FastifyPluginOptions } from "fastify";
import * as schemas from "./content.schemas";
import * as controllers from "./content.controllers";

async function ContentRoutes(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.route({
    method: "POST",
    url: "/journal",
    preHandler: server.authenticate,
    schema: schemas.CreateJournalEntrySchema,
    handler: controllers.CreateJournalEntryController,
  });

  server.route({
    method: "PUT",
    url: "/journal",
    preHandler: server.authenticate,
    handler: controllers.UpdateJournalEntryController,
  });


  server.route({
    method: "GET",
    url: "/userByEmail/:email",
    preHandler: server.authenticate,
    handler: controllers.GetUserByEmailController,
  });

}

export default ContentRoutes;
