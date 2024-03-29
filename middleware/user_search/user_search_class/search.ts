import { User_search } from "./user_search";
import { IUser } from "../../../helpers/interface/user_interface";
import { Database } from "../../../helpers/database/database";

export async function search_user(this: User_search, filtrer: any) {
    const users: IUser[] = [];
    const db = new Database();

    const result = await db.find_user(filtrer);
    for (let i = 0; i != result.length; i++) {
        const user_data: IUser = {
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
