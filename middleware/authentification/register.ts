import { Encrypt, Token } from "../../helpers/utils";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { User } from "../../helpers/interface/userInterface";
import { UserModel } from "../../helpers/models/userModel";
import { registerChecking } from "../../helpers/validator/register";
import { findUserWithEmail } from "../../helpers/database/userRequest";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { setLog } from "../log/setLog";

export async function register(
    { email, username, password }: User,
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
    const user: User = {
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

    let accesToken = "";
    let refreshToken = "";

    const time = new Date();

    try {
        await registerChecking(user);
        user.password = await Encrypt.cryptPassword(password);
        const newUser = await new UserModel({
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
        });
        await newUser.save();
        const res: any = await findUserWithEmail(user);
        user.id = res._id.toString();
        accesToken = await Token.generateAccessToken(user);
        refreshToken = await Token.generateRefreshToken(user);
        setLog(
            time,
            user.id ? user.id : "undefined",
            "info",
            _error,
            query,
            http_info
        );
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
