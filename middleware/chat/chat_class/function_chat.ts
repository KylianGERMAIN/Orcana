import { GraphQLError } from "graphql";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { CustomErrorMessage } from "../../../helpers/error/error";
import { chat_model } from "../../../helpers/models/chat_model";
import { Chat } from "./chat";

export async function empty_chat(this: Chat) {
    if (this._chat.message.length <= 0) {
        throw new GraphQLError(CustomErrorMessage.CHAT_EMPTY, {
            extensions: {
                status: StatusCodes.UNAUTHORIZED,
                error: ReasonPhrases.UNAUTHORIZED,
            },
        });
    }
}

export async function check_chat_exist(this: Chat) {
    const res = await chat_model.findOne({ _id: this._chat.id }).clone();
    if (res == null) {
        throw new GraphQLError(
            CustomErrorMessage.REMOVE_A_CHAT_THAT_DOESNT_EXIST,
            {
                extensions: {
                    status: StatusCodes.NOT_FOUND,
                    error: ReasonPhrases.NOT_FOUND,
                },
            }
        );
    }
    return res;
}

export async function only_sender_can_remove(this: Chat, chat: any) {
    if (this._chat.sender_id != chat.sender_id) {
        throw new GraphQLError(CustomErrorMessage.NOT_YOUR_CHAT, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
            },
        });
    }
}
