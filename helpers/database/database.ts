import { create_chat, delete_chat, get_chat } from "./chat_request";
import { set_log } from "./log_request";
import {
    delete_user,
    find_user_with_email,
    find_user_with_id,
    find_user,
    update_user,
} from "./user_request";
export class Database {
    // get //
    public find_user = find_user;
    public find_user_with_email = find_user_with_email;
    public find_user_with_id = find_user_with_id;

    public get_chat = get_chat;

    // update //
    public update_user = update_user;

    // delete //
    public delete_user = delete_user;
    public delete_chat = delete_chat;

    // set //
    public set_log = set_log;
    public create_chat = create_chat;
}
