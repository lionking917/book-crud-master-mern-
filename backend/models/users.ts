import mongoose from "mongoose";
import { User } from "../types";

type UserModel = Omit<User, "_id">;

const UserSchema = new mongoose.Schema<UserModel>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserModel>("User", UserSchema);
