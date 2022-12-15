export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  success: boolean;
  message: string | null;
}

export interface IUser {
    _id: string | null,
    name: string,
    email: string,
    password: string,
    journalIds: Array<string>
}

export interface IJournal {
    _id: string,
    title: string,
    content: string,
    date: Date,
    users: Array<string> | null
}

// Användaren loggar in, och då kommer IUser objektet att hämtas in i mobilappen.

// Appen kan vid tillfälle kalla på en endpoint som hämtar alla Journals som användaren är involverad i baserat på deras journal id's