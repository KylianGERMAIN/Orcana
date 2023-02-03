import { GraphQLError } from "graphql";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { valid_mail } from "../../../tools/input_tools";
import { CustomErrorMessage } from "../../error/error";
import { Authentification } from "../../../middleware/authentification/authentification_class/authentification";
import { Encrypt } from "../../utils";

export function check_valid_email(this: Authentification) {
    if (valid_mail(this.user.email) == false) {
        throw new GraphQLError(CustomErrorMessage.INVALID_EMAIL, {
            extensions: {
                status: StatusCodes.BAD_REQUEST,
                error: ReasonPhrases.BAD_REQUEST,
                field: "email",
            },
        });
    }
}

export async function compare_password(
    this: Authentification,
    password: string
) {
    if (
        (await Encrypt.compare_password(this.user.password, password)) != true
    ) {
        throw new GraphQLError(CustomErrorMessage.BAD_PASSWORD, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
                field: "password",
            },
        });
    }
}
