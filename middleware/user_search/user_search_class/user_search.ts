import { check_role, search_user_with_role } from "./search_with_role";
import { search_user_with_username } from "./search_with_username";
import { search_user_with_username_and_role } from "./search_with_username_and_role";

export class User_search {
    _role: string;
    _username: string;

    _list_role = ["user", "moderator", "administrator"];

    constructor(role: string, username: string) {
        this._role = role;
        this._username = username;
    }

    public check_role = check_role;
    public search_user_with_role = search_user_with_role;
    public search_user_with_username = search_user_with_username;
    public search_user_with_username_and_role =
        search_user_with_username_and_role;
}
