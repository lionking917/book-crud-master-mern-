import mongoose, {Types} from "mongoose";

export interface Book {
  text: string;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends mongoose.Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  roles: string[]
  _doc?: User;
}

export interface Session {
  id: number;
  dateCreated: number;
  username: string;
  /**
   * Timestamp indicating when the session was created, in Unix milliseconds.
   */
  issued: number;
  /**
   * Timestamp indicating when the session should expire, in Unix milliseconds.
   */
  expires: number;
}

/**
 * Identical to the Session type, but without the `issued` and `expires` properties.
 */
export type PartialSession = Omit<Session, "issued" | "expires">;

export interface EncodeResult {
  token: string;
  expires: number;
  issued: number;
}

export type DecodeResult =
  | {
      type: "valid";
      session: Session;
    }
  | {
      type: "integrity-error";
    }
  | {
      type: "invalid-token";
    };

export type ExpirationStatus = "expired" | "active" | "grace";
