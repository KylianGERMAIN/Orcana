import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../interface/userInterface";
import { CustomErrorMessage } from "../error/error";

export async function find_user(filter: object) {
    const UserModel = mongoose.model("users", UserSchema);
    const res = await UserModel.find(filter).clone();
    return res;
}


export async function find_user_with_email(user: User) {
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
    return res;
}

export async function find_user_with_id(user: User) {
    const UserModel = mongoose.model("users", UserSchema);
    const res = await UserModel.findOne({ _id: user.id }).clone();
    if (res == null) {
        throw new GraphQLError(CustomErrorMessage.NO_USER_WITH_ID, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
                field: "email",
            },
        });
    }
    return res;
}

export async function update_user(filter: object, update: object) {
    const UserModel = mongoose.model("users", UserSchema);
    await UserModel.updateOne(filter, update, function (err: any) {
        if (err) {
            throw new GraphQLError(CustomErrorMessage.MODIF_DATABASE, {
                extensions: {
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                },
            });
        }
    }).clone();
}

export async function delete_user(filter: object) {
    const UserModel = mongoose.model("users", UserSchema);
    await UserModel.deleteOne(filter, function (err: any) {
        if (err) {
            throw new GraphQLError(CustomErrorMessage.DELETE_USER_DATABASE, {
                extensions: {
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                },
            });
        }
    }).clone();
}
