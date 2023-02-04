import { check_role } from "./search_with_role";

export class User_search {
    _role: string;

    _list_role = ["user", "moderator", "administrator"];

    constructor(role: string) {
        this._role = role;
    }

    public check_role = check_role;
}
