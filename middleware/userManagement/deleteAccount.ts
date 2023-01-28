import { deleteUser } from "../../helpers/database/userRequest";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Token } from "../../helpers/utils";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { setLog } from "../log/setLog";

export async function deleteAccount(context: any) {
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
            await deleteUser({ _id: user.id });
            setLog(time, user.id, "info", _error, query, http_info);
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
