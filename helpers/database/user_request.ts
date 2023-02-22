import { GraphQLError } from "graphql";
import { user_model } from "../models/user_model";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../interface/user_interface";
import { CustomErrorMessage } from "../error/error";

export async function find_user(filter: object) {
    const res = await user_model.find(filter).clone();
    return res;
}

export async function find_user_with_email(user: User) {
    const res = await user_model.findOne({ email: user.email }).clone();
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
    const res = await user_model.findOne({ _id: user.id }).clone();
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
    await user_model
        .updateOne(filter, update, function (err: any) {
            if (err) {
                throw new GraphQLError(CustomErrorMessage.MODIF_DATABASE, {
                    extensions: {
                        status: StatusCodes.INTERNAL_SERVER_ERROR,
                        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                    },
                });
            }
        })
        .clone();
}

export async function delete_user(filter: object) {
    await user_model
        .deleteOne(filter, function (err: any) {
            if (err) {
                throw new GraphQLError(
                    CustomErrorMessage.DELETE_USER_DATABASE,
                    {
                        extensions: {
                            status: StatusCodes.INTERNAL_SERVER_ERROR,
                            error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                        },
                    }
                );
            }
        })
        .clone();
}
