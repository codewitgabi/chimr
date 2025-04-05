import {model, Schema} from "mongoose";


const ChatMessageSchema = new Schema({
    sender: {}, 
}, { timestamp: true, versionKey: false })


const ChatMessage = model("ChatMessage", ChatMessageSchema);
export default ChatMessage;
