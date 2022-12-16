export interface IJournalEntry {
_id: string,
title: string,
content: string,
date: string,
userIds: Array<string>
}

export interface IGetUserByEmail {
    email: string,
}
