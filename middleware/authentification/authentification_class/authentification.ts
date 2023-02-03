import { User } from "../../../helpers/interface/userInterface";
import {
    check_valid_email,
    compare_password,
} from "../../../helpers/validator/authentification/login";
import {
    check_email_exist,
    check_password,
    check_username,
} from "../../../helpers/validator/authentification/register";

export class Authentification {
    _user: User;

    _acces_token: string;
    _refresh_token: string;

    constructor(user: User) {
        this._user = user;
        this._acces_token = "";
        this._refresh_token = "";
    }

    get user() {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
    }

    get acces_token() {
        return this._acces_token;
    }

    set acces_token(acces_token: string) {
        this._acces_token = acces_token;
    }

    get refresh_token() {
        return this._refresh_token;
    }

    set refresh_token(refresh_token: string) {
        this._refresh_token = refresh_token;
    }

    public check_valid_email = check_valid_email;
    public check_email_exist = check_email_exist;
    public check_password = check_password;
    public compare_password = compare_password;
    public check_username = check_username;
    public reset_token() {
        this._acces_token = "";
        this._refresh_token = "";
    }
}
