import { FastifyReply, FastifyRequest } from "fastify";
import { IRegisterRequest, AuthResponse, IUser } from "./auth.interfaces";
import validateEmail from "../Utilities/validateEmail";

export async function RegisterController(
  request: FastifyRequest<{ Body: IRegisterRequest }>,
  reply: FastifyReply
) {
  const response: AuthResponse = {
    success: false,
    message: "",
    token: null
  };

  if (!validateEmail(request.body.email)) {
    response.success = false;
    response.message = "Enter a valid email address!";
    return await reply.status(400).send(response);
  }

  const { UserModel } = request.db.models;

  const existsUser = await UserModel.findOne({ email: request.body.email });

  if (existsUser) {
    response.success = false;
    response.message = "User already exists!";
    return await reply.status(400).send(response);
  }

  const newUser: IUser = {
    _id: null,
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    journalIds: [],
  };

  await UserModel.create(newUser);

  response.success = true;
  response.message = "User successfully created!";



  await reply.status(201).send(response);
}



export async function LoginController(request: FastifyRequest, reply: FastifyReply) {

};
