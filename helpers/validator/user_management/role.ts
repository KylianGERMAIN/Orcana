import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CustomErrorMessage } from "../../error/error";
import { User_management } from "../../../middleware/user_management/user_management_class/user_management";

export async function compare_role(this: User_management, newRole: string) {
    const listRole = ["user", "moderator", "administrator"];

    let numberUserRole = -1;
    let numberNewRole = -1;

    for (let i = 0; i != listRole.length; i++) {
        if (this.user.role == listRole[i]) {
            numberUserRole = i;
        }
        if (newRole == listRole[i]) {
            numberNewRole = i;
        }
    }

    if (
        numberNewRole > numberUserRole ||
        numberUserRole == -1 ||
        numberNewRole == -1
    ) {
        throw new GraphQLError(CustomErrorMessage.CANT_ASSIGN_ROLE, {
            extensions: {
                status: StatusCodes.FORBIDDEN,
                error: ReasonPhrases.FORBIDDEN,
                field: "role",
            },
        });
    }
}
