import { GraphQLError } from "graphql";
import { ReasonPhrases } from "http-status-codes/build/cjs/reason-phrases";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Encrypt, RequestContext, Token } from "../../helpers/utils";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { CustomErrorMessage } from "../../helpers/error/error";
import { Authentification } from "../authentification/authentification_class/authentification";
import { Database } from "../../helpers/database/database";

export async function reset_password(context: any, newPassword: string) {
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
        const token: JWT = (await Token.decode_refresh_token(
            context.headers.authorization,
            process.env.ACCESS_TOKEN_SECRET as string
        )) as JWT;
        if (token) {
            authentification.user.id = token.payload.id;
            authentification.check_password();
            const res: any = await db.find_user_with_id(authentification.user);
            if (await Encrypt.compare_password(newPassword, res.password)) {
                throw new GraphQLError(
                    CustomErrorMessage.NO_CHANGE_WITH_SAME_PASSWORD,
                    {
                        extensions: {
                            status: StatusCodes.FORBIDDEN,
                            error: ReasonPhrases.FORBIDDEN,
                            field: "password",
                        },
                    }
                );
            } else {
                authentification.user.password = await Encrypt.crypt_password(
                    newPassword
                );
                await db.update_user(
                    { id: authentification.user.id },
                    { password: authentification.user.password }
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
