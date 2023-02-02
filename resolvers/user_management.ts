import { reset_password } from "../middleware/user_management/reset_password";
import { set_username } from "../middleware/user_management/set_username";
import { set_role } from "../middleware/user_management/set_role";
import { delete_account } from "../middleware/user_management/delete_account";

export const user_management_mutation = {
    reset_password: async (parent: never, { newPassword }: any, context: any) =>
        reset_password(context, newPassword),
    set_role: async (parent: never, { user_id, role }: any, context: any) =>
        set_role(context, user_id, role),
    set_username: async (parent: never, { username }: any, context: any) =>
        set_username(context, username),
};

export const user_management_query = {
    delete_account: async (parent: never, values: never, context: any) =>
        delete_account(context),
};
