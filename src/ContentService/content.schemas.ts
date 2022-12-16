const JournalEntryProperties = {
  title: { description: "Title of the entry", type: "string" },
  content: { description: "Content of the entry", type: "string" },
  date: { description: "The date of the entry", type: "string" },
  userIds: {
    description: "A list of user ids involved with this entry",
    type: "array",
    items: {
      type: "string",
      description: "test",
    },
  },
};

export const CreateJournalEntrySchema = {
  body: {
    type: "object",
    description: "The entry to create",
    required: ["title", "content", "date", "userIds"],
    properties: JournalEntryProperties,
  },
  response: {
    200: {
      type: "object",
      description: "The created journal entry",
      properties: {
        title: { description: "Title of the entry", type: "string" },
        content: { description: "Content of the entry", type: "string" },
        date: { description: "The date of the entry", type: "string" },
        userIds: {
          description: "A list of user ids involved with this entry",
          type: "array",
          items: {
            type: "string",
            description: "test",
          },
        },
        _id: { description: "Id of the entry", type: "string" },
      },
    },
  },
};
