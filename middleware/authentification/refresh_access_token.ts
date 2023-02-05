import { Database } from "../../helpers/database/database";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { RequestContext, Token } from "../../helpers/utils";
import { Authentification } from "./authentification_class/authentification";

export async function refresh_access_token(context: any) {
    const user: User = {
        email: "",
        username: "",
        password: "",
        role: "",
        id: "",
    };
    let _error: ErrorResponse = {
        message: "",
        extensions: {
            status: 0,
            error: "",
            field: "",
        },
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
        const token: JWT = (await Token.decode_token(
            context.headers.authorization,
            process.env.REFRESH_TOKEN_SECRET as string
        )) as JWT;
        if (token) {
            authentification.user.id = token.payload.id;
            authentification._acces_token = await Token.generate_access_token(
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
        }
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
        accessToken: authentification._acces_token,
        expires_in: "1800s",
        tokenType: "Bearer",
    };
}
