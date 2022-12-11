import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../interface/userInterface";

export async function findUser(user: User) {
  const UserModel = mongoose.model("users", UserSchema);
  const res = await UserModel.findOne({ email: user.email }).clone();
  if (res == null) {
    throw new GraphQLError("The email already exist", {
      extensions: {
        status: StatusCodes.FORBIDDEN,
        error: ReasonPhrases.FORBIDDEN,
        field: "email",
      },
    });
  }
  return res;
}

export async function updateUser(filter: object, update: object) {
  const UserModel = mongoose.model("users", UserSchema);
  await UserModel.updateOne(filter, update, function (err: any) {
    if (err) {
      throw new GraphQLError(
        "An error when modifying the data in the database",
        {
          extensions: {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: ReasonPhrases.INTERNAL_SERVER_ERROR,
          },
        }
      );
    }
  }).clone();
}
