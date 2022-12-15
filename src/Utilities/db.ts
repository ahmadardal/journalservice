import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyPlugin from "fastify-plugin";
import mongoose, { Model } from "mongoose";
import { IUser } from "../AuthService/auth.interfaces";
import { UserModel } from "../Models/UserModel";

export interface Models {
  UserModel: Model<IUser>;
}

export interface Db {
  models: Models;
}

async function database(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {

 mongoose.set('strictQuery', true);
  // Här konfigurerar vi EventListeners, som kommer att lyssna efter händelser
  // och köra en anonym funktion som endast printar ut i loggen när händelsen har inträffat.
  mongoose.connection.on("connected", () => {
    server.log.info("MongoDB connected!");
  });

  mongoose.connection.on("disconnected", () => {
    server.log.info("Mongo DB disconnected!");
  });

  // Vi etablerar en anslutning med våran MongoDB databas.
  await mongoose.connect(
    "mongodb+srv://ahmadardal:Ahmed123@cluster0.khlxn.mongodb.net/?retryWrites=true&w=majority"
  );

  const models: Models = { UserModel };

  // Här interceptar vi alla requests som kommer in till våran server, och lägger in ett objekt i självaste requesten,
  // innan den har nått våra controllers. Objektet som vi lägger in innehåller då våra mongoose modeller. Dessa modeller blir då tillgängliga
  // i exempelvis våra controllers.

  server.addHook(
    "onRequest",
    async (request: FastifyRequest, reply: FastifyReply) => {
      request.db = { models };
    }
  );
}

export default fastifyPlugin(database);
