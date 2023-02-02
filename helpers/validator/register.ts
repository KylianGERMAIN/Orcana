import { valid_mail } from "../../tools/input_tools";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../interface/userInterface";
import { CustomErrorMessage } from "../error/error";

async function email_exist(email: string) {
    const UserModel = mongoose.model("users", UserSchema);
    const res = await UserModel.findOne({ email: email }).clone();
    if (res != null) {
        throw new GraphQLError(CustomErrorMessage.EMAIL_ALREADY_EXIST, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
                field: "email",
            },
        });
    }
}

async function password_checking(password: string) {
    if (password.length <= 6) {
        throw new GraphQLError(CustomErrorMessage.PASSWORD_LENGTH, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
                field: "password",
            },
        });
    }
}

async function name_checking(username: string) {
    if (username.length <= 6) {
        throw new GraphQLError(CustomErrorMessage.NAME_LENGTH, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
                field: "username",
            },
        });
    }
}

export async function register_checking(user: User) {
    if (valid_mail(user.email) == false) {
        throw new GraphQLError(CustomErrorMessage.INVALID_EMAIL, {
            extensions: {
                status: StatusCodes.BAD_REQUEST,
                error: ReasonPhrases.BAD_REQUEST,
                field: "email",
            },
        });
    } else {
        await email_exist(user.email);
        await name_checking(user.username);
        await password_checking(user.password);
    }
}
