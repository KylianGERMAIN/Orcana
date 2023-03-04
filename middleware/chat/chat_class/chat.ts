import { IChat } from "../../../helpers/interface/chat_interface";
import {
    check_chat_exist,
    empty_chat,
    only_sender_can_remove,
} from "./function_chat";

export class Chat {
    _chat: IChat;
    _chats: IChat[] = [];

    constructor(chat: IChat) {
        this._chat = chat;
    }

    public empty_chat = empty_chat;
    public only_sender_can_remove = only_sender_can_remove;
    public check_chat_exist = check_chat_exist;
}
