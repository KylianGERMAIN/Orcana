import { GraphQLError } from "graphql";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { CustomErrorMessage } from "../../../helpers/error/error";
import { IChat } from "../../../helpers/interface/chat_interface";

export async function empty_chat(chat: IChat) {
    if (chat.message.length <= 0) {
        throw new GraphQLError(CustomErrorMessage.CHAT_EMPTY, {
            extensions: {
                status: StatusCodes.UNAUTHORIZED,
                error: ReasonPhrases.UNAUTHORIZED,
            },
        });
    }
}
