import { User_search } from "./user_search";
import { User } from "../../../helpers/interface/userInterface";
import { find_user_with_username_and_role } from "../../../helpers/database/userRequest";

export async function search_user_with_username_and_role(this: User_search) {
    const users: User[] = [];

    const result = await find_user_with_username_and_role(
        this._role,
        this._username
    );
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
