import { FastifyRequest, FastifyReply } from "fastify";
import { IGetUserByEmail, IJournalEntry } from "./content.interfaces";

export async function GetJournalsController(
  request: FastifyRequest<{ Body: IJournalEntry }>,
  reply: FastifyReply
) {
  const { JournalEntryModel } = request.db.models;

  const { userId } = request.user;

  const entries = await JournalEntryModel.find({
    userIds: userId
  })

  return await reply.status(200).send(entries);
}

export async function CreateJournalEntryController(
  request: FastifyRequest<{ Body: IJournalEntry }>,
  reply: FastifyReply
) {
  const { userId } = request.user;

  console.log("USER ID: ", userId)

  const { JournalEntryModel } = request.db.models;

  const newEntry = {
    title: request.body.title,
    content: request.body.content,
    date: request.body.date,
    userIds: request.body.userIds,
  };

  if (!newEntry.userIds.includes(userId)) {
    newEntry.userIds.push(userId);
  }

  const journalEntry = await JournalEntryModel.create(newEntry);

  return await reply.status(201).send(journalEntry);
}

export async function UpdateJournalEntryController(
  request: FastifyRequest<{ Body: IJournalEntry }>,
  reply: FastifyReply
) {
  const { JournalEntryModel } = request.db.models;

  const { userId } = request.user;

  const entryExists = await JournalEntryModel.findById(request.body._id);

  if (entryExists === null) {
    return await reply
      .status(404)
      .send(`No entry was found with id ${request.body._id}!`);
  }

  if (!entryExists.userIds.includes(userId)) {
    return await reply
      .status(403)
      .send("You do not have access to this entry!");
  }

  const updatedEntry = await JournalEntryModel.findByIdAndUpdate(
    request.body._id,
    request.body,
    { new: true }
  );

  return await reply.status(200).send(updatedEntry);
}

export async function GetUserByEmailController(
  request: FastifyRequest<{ Params: IGetUserByEmail }>,
  reply: FastifyReply
) {
  const { UserModel } = request.db.models;

  const foundUser = await UserModel.findOne({ email: request.params.email });

  if (foundUser === null) {
    return await reply.status(404).send("User not found!");
  }

  return await reply.status(200).send({
    email: foundUser.email,
    userId: foundUser._id,
  });
}
