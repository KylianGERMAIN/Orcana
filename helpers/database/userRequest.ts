import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../interface/userInterface";


export async function findUserWithEmail(user: User) {
  const UserModel = mongoose.model("users", UserSchema);
  const res = await UserModel.findOne({ email: user.email }).clone();
  if (res == null) {
    throw new GraphQLError("The user does not exist", {
      extensions: {
        status: StatusCodes.FORBIDDEN,
        error: ReasonPhrases.FORBIDDEN,
        field: "email",
      },
    });
  }
  return res;
}

export async function findUserWithId(user: User) {
  const UserModel = mongoose.model("users", UserSchema);
  const res = await UserModel.findOne({ _id: user.id }).clone();
  if (res == null) {
    throw new GraphQLError("The user with the id does not exist", {
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
  await UserModel.updateOne(filter, update, function (err: any, res: any) {
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

export async function deleteUser(filter: object) {
  const UserModel = mongoose.model("users", UserSchema);
  await UserModel.deleteOne(filter, function (err: any) {
    if (err) {
      throw new GraphQLError("An error when deleting an user in the database", {
        extensions: {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          error: ReasonPhrases.INTERNAL_SERVER_ERROR,
        },
      });
    }
  }).clone();
}
