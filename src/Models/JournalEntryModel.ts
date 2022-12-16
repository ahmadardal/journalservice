import { model, Schema } from "mongoose";
import { IJournalEntry } from "../ContentService/content.interfaces";

const JournalEntrySchema = new Schema<IJournalEntry>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  userIds: { type: [String], required: true },
});

export const JournalEntryModel = model<IJournalEntry>(
  "JournalEntries",
  JournalEntrySchema
);
