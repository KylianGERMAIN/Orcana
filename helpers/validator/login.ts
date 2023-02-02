import { GraphQLError } from "graphql";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import mongoose from "mongoose";
import { valid_mail } from "../../tools/input_tools";
import { CustomErrorMessage } from "../error/error";
import { User } from "../interface/userInterface";
import { UserSchema } from "../models/userModel";
import { Encrypt } from "../utils";

export async function login_checking(user: User) {
    if (!valid_mail(user.email)) {
        throw new GraphQLError(CustomErrorMessage.INVALID_EMAIL, {
            extensions: {
                status: StatusCodes.BAD_REQUEST,
                error: ReasonPhrases.BAD_REQUEST,
                field: "email",
            },
        });
    }
    const UserModel = mongoose.model("users", UserSchema);
    const res = await UserModel.findOne({ email: user.email }).clone();
    if (res == null) {
        throw new GraphQLError(CustomErrorMessage.NO_USER, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
                field: "email",
            },
        });
    }
    if ((await Encrypt.compare_password(user.password, res.password)) != true) {
        throw new GraphQLError(CustomErrorMessage.BAD_PASSWORD, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
                field: "password",
            },
        });
    }
    return res;
}
