import { GraphQLError } from "graphql/error/GraphQLError";
import { User_search } from "./user_search";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { CustomErrorMessage } from "../../../helpers/error/error";

export function check_role(this: User_search) {
    let role_exists = false;

    for (let i = 0; i != this._list_role.length; i++) {
        if (this._role == this._list_role[i]) {
            role_exists = true;
        }
    }

    if (role_exists != true) {
        throw new GraphQLError(CustomErrorMessage.NO_ROLE, {
            extensions: {
                status: StatusCodes.NOT_FOUND,
                error: ReasonPhrases.NOT_FOUND,
                field: "role",
            },
        });
    }
}
