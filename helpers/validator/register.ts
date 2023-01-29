import { validMail } from "../../tools/inputTools";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../interface/userInterface";
import { CustomErrorMessage } from "../Error/error";

async function emailExist(email: string) {
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

async function passwordChecking(password: string) {
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

async function nameChecking(username: string) {
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

export async function registerChecking(user: User) {
    console.log(!validMail(user.email));
    if (!validMail(user.email) == true) {
        throw new GraphQLError(CustomErrorMessage.INVALID_EMAIL, {
            extensions: {
                status: StatusCodes.BAD_REQUEST,
                error: ReasonPhrases.BAD_REQUEST,
                field: "email",
            },
        });
    }
    await emailExist(user.email);
    await nameChecking(user.username);
    await passwordChecking(user.password);
}
