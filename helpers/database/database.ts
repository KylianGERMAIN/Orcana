import { set_log } from "./set_log";
import {
    delete_user,
    find_user_with_email,
    find_user_with_id,
    find_user,
    update_user,
} from "./userRequest";
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
}
