import { resetPassword } from "../middleware/userManagement/resetPassword";
import { setUsername } from "../middleware/userManagement/setUsername";
import { setRole } from "../middleware/userManagement/setRole";
import { deleteAccount } from "../middleware/userManagement/deleteAccount";

export const UserManagementMutation = {
  resetPassword: async (parent: any, { newPassword }: any, context: any) =>
    resetPassword(context.authorization, newPassword),
  setRole: async (parent: any, { user_id, role }: any, context: any) =>
    setRole(context.headers.authorization, user_id, role),
  setUsername: async (parent: any, { username }: any, context: any) =>
    setUsername(context.headers.authorization, username),
};

export const UserManagementQuery = {
  deleteAccount: async (parent: any, {}: any, context: any) =>
    deleteAccount(context.headers.authorization),
};
