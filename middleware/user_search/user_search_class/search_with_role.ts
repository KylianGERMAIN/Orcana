import { GraphQLError } from "graphql/error/GraphQLError";
import { User_search } from "./user_search";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { CustomErrorMessage } from "../../../helpers/error/error";
import { User } from "../../../helpers/interface/userInterface";
import { find_user_with_role } from "../../../helpers/database/userRequest";

export function check_role(this: User_search) {
    let role_exists = false;

    for (let i = 0; i != this._list_role.length; i++) {
        if (this._role == this._list_role[i]) {
            role_exists = true;
        }
    }

    if (role_exists != true) {
        throw new GraphQLError(CustomErrorMessage.NO_USER, {
            extensions: {
                status: StatusCodes.NOT_FOUND,
                error: ReasonPhrases.NOT_FOUND,
                field: "role",
            },
        });
    }
}

export async function search_user_with_role(this: User_search) {
    const users: User[] = [];

    const result = await find_user_with_role(this._role);
    for (let i = 0; i != result.length; i++) {
        const user_data: User = {
            email: result[i].email,
            username: result[i].username,
            password: "",
            role: "",
            id: result[i]._id.toString(),
        };
        users.push(user_data);
    }
    return users;
}