import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

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
  generateAccessToken: async (user: any) => {
    return await jsonwebtoken.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "1800s",
      }
    );
  },
  generateRefreshToken: async (user: any) => {
    return await jsonwebtoken.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "2y",
      }
    );
  },
};
