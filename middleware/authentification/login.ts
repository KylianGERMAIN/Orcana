import { Encrypt, Token } from "../../helpers/utils";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { User } from "../../helpers/interface/userInterface";
import { setLog } from "../log/setLog";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { loginChecking } from "../../helpers/validator/login";

export async function login(email: string, password: string, context: any) {
    let _error: ErrorResponse = {
        message: "",
        extensions: {
            status: 0,
            error: "",
            field: "",
        },
    };

    const user: User = {
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

    let accesToken = "";
    let refreshToken = "";

    const time = new Date();

    try {
        const result = await loginChecking(user);
        user.id = result._id.toString();
        user.password = await Encrypt.cryptPassword(password);
        accesToken = await Token.generateAccessToken(user);
        refreshToken = await Token.generateRefreshToken(user);
        setLog(time, user.id, "info", _error, query, http_info);
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
        refreshToken: refreshToken,
        accessToken: accesToken,
        expires_in: "1800s",
        tokenType: "Bearer",
    };
}
