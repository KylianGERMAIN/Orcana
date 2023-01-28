import { resetPassword } from "../middleware/userManagement/resetPassword";
import { setUsername } from "../middleware/userManagement/setUsername";
import { setRole } from "../middleware/userManagement/setRole";
import { deleteAccount } from "../middleware/userManagement/deleteAccount";

export const UserManagementMutation = {
    resetPassword: async (parent: never, { newPassword }: any, context: any) =>
        resetPassword(context, newPassword),
    setRole: async (parent: never, { user_id, role }: any, context: any) =>
        setRole(context, user_id, role),
    setUsername: async (parent: never, { username }: any, context: any) =>
        setUsername(context, username),
};

export const UserManagementQuery = {
    deleteAccount: async (parent: never, values: never, context: any) =>
        deleteAccount(context),
};
