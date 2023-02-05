/* eslint-disable no-useless-escape */
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { User } from "./interface/userInterface";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CustomErrorMessage } from "./error/error";

export const Encrypt = {
    crypt_password: (password: string) =>
        bcrypt
            .genSalt(15)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hash) => hash),

    compare_password: (password: string, hashPassword: string) =>
        bcrypt.compare(password, hashPassword).then((resp) => resp),
};

export const RequestContext = {
    check_operation_name: (operationName: string) => {
        if (operationName == undefined) {
            throw new Error("No operationName");
        }
    },
};

export const Token = {
    generate_access_token: async (user: User) => {
        return await jsonwebtoken.sign(
            { id: user.id },
            process.env.ACCESS_TOKEN_SECRET as string,
            {
                expiresIn: "1800s",
            }
        );
    },
    generate_refresh_token: async (user: User) => {
        return await jsonwebtoken.sign(
            { id: user.id },
            process.env.REFRESH_TOKEN_SECRET as string,
            {
                expiresIn: "2y",
            }
        );
    },
    decode_token: async (token: string, key: string) => {
        if (token == undefined) {
            throw new GraphQLError(CustomErrorMessage.NO_AUTHORIZATION, {
                extensions: {
                    status: StatusCodes.FORBIDDEN,
                    error: ReasonPhrases.FORBIDDEN,
                    field: "Authorization",
                },
            });
        }
        const token_section = token.split(" ");
        if (token_section.length != 2 || token_section[0] != "Bearer") {
            throw new GraphQLError(CustomErrorMessage.INVALID_TOKEN, {
                extensions: {
                    status: StatusCodes.FORBIDDEN,
                    error: ReasonPhrases.FORBIDDEN,
                    field: "Authorization",
                },
            });
        } else {
            if (jsonwebtoken.verify(token_section[1], key as string)) {
                const decodedToken = jsonwebtoken.decode(token_section[1], {
                    complete: true,
                });
                return decodedToken;
            } else {
                throw new GraphQLError(CustomErrorMessage.INVALID_TOKEN, {
                    extensions: {
                        status: StatusCodes.FORBIDDEN,
                        error: ReasonPhrases.FORBIDDEN,
                        field: "Authorization",
                    },
                });
            }
        }
    },
};

export function valid_mail(mail: string) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
        mail
    );
}
