import mongoose from "mongoose";
import { Book } from "../types";

const BookSchema = new mongoose.Schema<Book>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Book>("Book", BookSchema);
