import { GraphQLError } from "graphql";
import { ReasonPhrases } from "http-status-codes/build/cjs/reason-phrases";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { findUserWithId, updateUser } from "../../helpers/database/userRequest";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Encrypt, Token } from "../../helpers/utils";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { setLog } from "../log/setLog";
import { CustomErrorMessage } from "../../helpers/Error/error";

export async function resetPassword(context: any, newPassword: string) {
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

    try {
        const token: JWT = (await Token.decodeRefreshToken(
            context.headers.authorization,
            process.env.ACCESS_TOKEN_SECRET as string
        )) as JWT;
        if (token) {
            user.id = token.payload.id;
            const res: any = await findUserWithId(user);
            if (await Encrypt.comparePassword(newPassword, res.password)) {
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
                user.password = await Encrypt.cryptPassword(newPassword);
                await updateUser({ id: user.id }, { password: user.password });
                setLog(time, user.id, "info", _error, query, http_info);
            }
        }
    } catch (e: any) {
        _error = e;
        setLog(
            time,
            user.id ? user.id : "undefined",
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
