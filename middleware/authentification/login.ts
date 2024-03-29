import { RequestContext, Token } from "../../helpers/utils";
import { ErrorResponse } from "../../helpers/interface/error_interface";
import { IUser } from "../../helpers/interface/user_interface";
import { HttpInfo, QueryContent } from "../../helpers/interface/log_interface";
import { Authentification } from "./authentification_class/authentification";
import { Database } from "../../helpers/database/database";

export async function login(email: string, password: string, context: any) {
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
        username: "",
        password: password,
        role: "",
        id: "user",
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
        RequestContext.check_operation_name(context.body.operationName);
        await authentification.check_valid_email();
        const result = await db.find_user_with_email(authentification.user);
        await authentification.compare_password(result.password);
        authentification.user.id = result._id.toString();
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
