import { User } from "../../../helpers/interface/user_interface";
import { compare_role } from "../../../helpers/validator/user_management/role";

export class User_management {
    _user: User;

    constructor(user: User) {
        this._user = user;
    }

    get user() {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
    }

    public compare_role = compare_role;
}
