import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { UserModel } from "../../helpers/models/userModel";
import { login } from "../../helpers/validator/Indentification";

export async function register({ email, name, password }: any) {
  console.log(email);
  let item = {};
  let _error: ErrorResponse = {
    message: "",
    extensions: {
      status: 0,
      error: "",
      field: "",
    },
  };

  try {
    login(email, name, password);
    const newItem = await new UserModel({ email, name, password });
    item = await newItem.save();
    console.log("item  ==== ", item);
  } catch (e: any) {
    console.log(e);
    _error = e;
  }
  return {
    item: item,
    error: _error,
  };
}
