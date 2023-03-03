import { IChat } from "../../../helpers/interface/chat_interface";
import { empty_chat } from "./function_chat";

export class Chat {
    _chat: IChat;
    _chats: IChat[] = [];

    constructor(chat: IChat) {
        this._chat = chat;
    }

    public empty_chat = empty_chat;
}
