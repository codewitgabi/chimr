import { model, Schema, Document } from "mongoose";

interface IChatMessageSchema extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  message: string;
  isRead: boolean;
}

const ChatMessageSchema: Schema<IChatMessageSchema> = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      trim: true,
      minLength: 1,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true, versionKey: false }
);

const ChatMessage = model<IChatMessageSchema>("ChatMessage", ChatMessageSchema);
export default ChatMessage;
