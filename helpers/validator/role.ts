import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CustomErrorMessage } from "../Error/error";

export async function compareRole(userRole: string, newRole: string) {
    var listRole = ["user", "moderator", "administrator"];

    var numberUserRole: number = -1;
    var numberNewRole: number = -1;

    for (var i: number = 0; i != listRole.length; i++) {
        if (userRole == listRole[i]) {
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
