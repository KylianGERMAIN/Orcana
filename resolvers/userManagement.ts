import { resetPassword } from "../middleware/userManagement/resetPassword";
import { setRole } from "../middleware/userManagement/setRole";

export const UserManagementMutation = {
  resetPassword: async (parent: any, { newPassword }: any, context: any) =>
    resetPassword(context.authorization, newPassword),
  setRole: async (parent: any, { user_id, role }: any, context: any) =>
    setRole(context.authorization, user_id, role),
};

export const UserManagementQuery = {};
