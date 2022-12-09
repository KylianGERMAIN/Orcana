import { validMail } from "../../tools/inputTools";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../interface/userInterface";
import { Encrypt } from "../utils";

async function emailExist(email: string) {
  const UserModel = mongoose.model("users", UserSchema);
  const res = await UserModel.findOne({ email: email }).clone();
  if (res != null) {
    throw new GraphQLError("The email already exist", {
      extensions: {
        status: StatusCodes.FORBIDDEN,
        error: ReasonPhrases.FORBIDDEN,
        field: "email",
      },
    });
  }
}

async function passwordChecking(password: string) {
  if (password.length <= 6) {
    throw new GraphQLError(
      "Your password length must be at least 7 characters",
      {
        extensions: {
          status: StatusCodes.FORBIDDEN,
          error: ReasonPhrases.FORBIDDEN,
          field: "password",
        },
      }
    );
  }
}

async function nameChecking(username: string) {
  if (username.length <= 6) {
    throw new GraphQLError("Your name length must be at least 7 characters", {
      extensions: {
        status: StatusCodes.FORBIDDEN,
        error: ReasonPhrases.FORBIDDEN,
        field: "username",
      },
    });
  }
}

export async function registerChecking(user: User) {
  if (!validMail(user.email)) {
    throw new GraphQLError("Your email is not valid", {
      extensions: {
        status: StatusCodes.BAD_REQUEST,
        error: ReasonPhrases.BAD_REQUEST,
        field: "email",
      },
    });
  }
  await emailExist(user.email);
  await nameChecking(user.username);
  await passwordChecking(user.password);
}

export async function loginChecking(user: User) {
  if (!validMail(user.email)) {
    throw new GraphQLError("Your email is not valid", {
      extensions: {
        status: StatusCodes.BAD_REQUEST,
        error: ReasonPhrases.BAD_REQUEST,
        field: "email",
      },
    });
  }
  const UserModel = mongoose.model("users", UserSchema);
  const res = await UserModel.findOne({ email: user.email }).clone();
  if (res == null) {
    throw new GraphQLError("The account does not exist", {
      extensions: {
        status: StatusCodes.FORBIDDEN,
        error: ReasonPhrases.FORBIDDEN,
        field: "email",
      },
    });
  }
  if ((await Encrypt.comparePassword(user.password, res.password)) != true) {
    throw new GraphQLError("The password is incorrect", {
      extensions: {
        status: StatusCodes.FORBIDDEN,
        error: ReasonPhrases.FORBIDDEN,
        field: "password",
      },
    });
  }
}