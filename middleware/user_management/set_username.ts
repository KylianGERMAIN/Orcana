import { GraphQLError } from "graphql";
import { ErrorResponse } from "../../helpers/interface/error_interface";
import { JWT, User } from "../../helpers/interface/user_interface";
import { RequestContext, Token } from "../../helpers/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { HttpInfo, QueryContent } from "../../helpers/interface/log_interface";
import { CustomErrorMessage } from "../../helpers/error/error";
import { Authentification } from "../authentification/authentification_class/authentification";
import { Database } from "../../helpers/database/database";

export async function set_username(context: any, name: string) {
    const user: User = {
        email: "",
        username: name,
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
        if (authentification.user.username) {
            await authentification.check_username();
            const token: JWT = (await Token.decode_token(
                context.headers.authorization,
                process.env.ACCESS_TOKEN_SECRET as string
            )) as JWT;
            if (token) {
                authentification.user.id = token.payload.id;
                const res: any = await db.find_user_with_id(
                    authentification.user
                );
                await db.update_user(
                    { id: res.id },
                    { username: authentification.user.username }
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
        } else {
            throw new GraphQLError(CustomErrorMessage.USERNAME_NO_EXIST, {
                extensions: {
                    status: StatusCodes.FORBIDDEN,
                    error: ReasonPhrases.FORBIDDEN,
                    field: "username",
                },
            });
        }
    } catch (e: any) {
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
    };
}
