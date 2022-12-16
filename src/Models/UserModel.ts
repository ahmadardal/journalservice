import { model, Schema } from "mongoose";
import { IUser } from "../AuthService/auth.interfaces";

const UserSchema = new Schema<IUser>({
    _id: {type: String, required: false},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    journalIds: {type: [String], required: true}
})

export const UserModel = model<IUser>("User", UserSchema);