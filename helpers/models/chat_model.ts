import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const GlobalChatSchema = new Schema(
    {
        timestamp: {
            type: String,
            required: true,
        },
        sender_id: {
            type: String,
        },
        receiver_id: {
            type: String,
        },
        message: {
            type: String,
        },
    },
    { timestamps: false, _id: true }
);

export const chat_model = mongoose.model("chat", GlobalChatSchema);
