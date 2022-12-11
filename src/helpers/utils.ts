import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { User } from "./interface/userInterface";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const Encrypt = {
  cryptPassword: (password: string) =>
    bcrypt
      .genSalt(15)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => hash),

  comparePassword: (password: string, hashPassword: string) =>
    bcrypt.compare(password, hashPassword).then((resp) => resp),
};

export const Token = {
  generateAccessToken: async (user: User) => {
    return await jsonwebtoken.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "1800s",
      }
    );
  },
  generateRefreshToken: async (user: User) => {
    return await jsonwebtoken.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "2y",
      }
    );
  },
  decodeRefreshToken: async (token: string, key: string) => {
    var token_section = token.split(" ");
    if (token_section.length != 2 || token_section[0] != "Bearer") {
      throw new GraphQLError("Your authorization bearer token is not valid", {
        extensions: {
          status: StatusCodes.FORBIDDEN,
          error: ReasonPhrases.FORBIDDEN,
          field: "Authorization",
        },
      });
    } else {
      if (jsonwebtoken.verify(token_section[1], key as string)) {
        const decodedToken = jsonwebtoken.decode(token_section[1], {
          complete: true,
        });
        return decodedToken;
      } else {
        throw new GraphQLError("Your authorization bearer token is not valid", {
          extensions: {
            status: StatusCodes.FORBIDDEN,
            error: ReasonPhrases.FORBIDDEN,
            field: "Authorization",
          },
        });
      }
    }
  },
};
