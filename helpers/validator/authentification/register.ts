import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Authentification } from "../../../middleware/authentification/authentification_class/authentification";
import { CustomErrorMessage } from "../../error/error";
import { user_model } from "../../models/user_model";

export async function check_email_exist(this: Authentification) {
    const res = await user_model
        .findOne({
            email: this.user.email,
        })
        .clone();
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

export async function check_password(this: Authentification) {
    if (this.user.password.length <= 6) {
        throw new GraphQLError(CustomErrorMessage.PASSWORD_LENGTH, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
                field: "password",
            },
        });
    }
}

export async function check_username(this: Authentification) {
    if (this.user.username.length <= 6) {
        throw new GraphQLError(CustomErrorMessage.NAME_LENGTH, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
                field: "username",
            },
        });
    }
}
