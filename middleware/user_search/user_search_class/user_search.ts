import { check_role } from "./role";
import { search_user } from "./search";

export class User_search {
    _role: string;
    _username: string;

    _list_role = ["user", "moderator", "administrator"];

    constructor(role: string, username: string) {
        this._role = role;
        this._username = username;
    }

    public check_role = check_role;
    public search_user = search_user;
}
