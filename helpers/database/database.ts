import { create_chat } from "./chat_request";
import { set_log } from "./log_request";
import {
    delete_user,
    find_user_with_email,
    find_user_with_id,
    find_user,
    update_user,
} from "./user_request";
export class Database {
    // find user//
    public find_user = find_user;
    public find_user_with_email = find_user_with_email;
    public find_user_with_id = find_user_with_id;

    // update //
    public update_user = update_user;

    // delete //
    public delete_user = delete_user;

    // set //
    public set_log = set_log;
    public create_chat = create_chat;
}
