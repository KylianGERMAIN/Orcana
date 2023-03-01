import { Encrypt, RequestContext, Token } from "../../helpers/utils";
import { ErrorResponse } from "../../helpers/interface/error_interface";
import { IUser } from "../../helpers/interface/user_interface";
import { user_model } from "../../helpers/models/user_model";
import { HttpInfo, QueryContent } from "../../helpers/interface/log_interface";
import { Authentification } from "./authentification_class/authentification";
import { Database } from "../../helpers/database/database";

export async function register(
    { email, username, password }: IUser,
    context: any
) {
    let _error: ErrorResponse = {
        message: "",
        extensions: {
            status: 0,
            error: "",
            field: "",
        },
    };
    const user: IUser = {
        email: email,
        username: username,
        password: password,
        role: "user",
        id: "",
    };

    const http_info: HttpInfo = {
        status: "200",
        url: context.originalUrl ? context.originalUrl : "",
        ip: "",
        method: context.method ? context.method : "",
    };

    const query: QueryContent = {
        operationName: context.body.operationName
            ? context.body.operationName
            : "",
        query: context.body.query ? context.body.query : "",
    };

    const time = new Date();
    const authentification = new Authentification(user);
    const db = new Database();

    try {
        await RequestContext.check_operation_name(context.body.operationName);
        await authentification.check_valid_email();
        await authentification.check_email_exist();
        await authentification.check_password();
        await authentification.check_username();
        authentification.user.password = await Encrypt.crypt_password(password);
        const newUser = await new user_model(authentification.user);
        await newUser.save();
        const res: any = await db.find_user_with_email(authentification.user);
        authentification.user.id = res._id.toString();
        authentification.acces_token = await Token.generate_access_token(
            authentification.user
        );
        authentification.refresh_token = await Token.generate_refresh_token(
            authentification.user
        );
        db.set_log(
            time,
            authentification.user.id,
            "info",
            _error,
            query,
            http_info
        );
    } catch (e: any) {
        authentification.reset_token();
        _error = e;
        db.set_log(
            time,
            authentification.user.id,
            "error",
            _error,
            query,
            http_info
        );
    }
    return {
        error: _error,
        refresh_token: authentification.refresh_token,
        access_token: authentification.acces_token,
        expires_in: "1800s",
        token_type: "Bearer",
    };
}
