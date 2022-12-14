import { describe, expect, test } from "@jest/globals";

const dotenv = require("dotenv");
const fetch = require("node-fetch");

const mutation = `mutation login($password: String, $email: String) {
  login(password: $password, email: $email) {
    accessToken
    error {
      message
    }
    expires_in
    refreshToken
    tokenType
  }
}`;

dotenv.config({ path: `.env.test` });

describe("Login", () => {
  test("Success", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: mutation,
        variables: {
          email: process.env.EMAIL_LOGIN_TEST,
          password: process.env.PASSWORD_LOGIN_TEST,
        },
      }),
    })
      .then((res: any) => {
        expect(res.status).toEqual(200);
        return res.json();
      })
      .then((res: any) => {
        expect(res.errors).toBe(undefined);
      });
  });

  test("Wrong email format", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: mutation,
        variables: {
          email: "jean.com",
          password: "123456789",
        },
      }),
    })
      .then((res: any) => {
        expect(res.status).toEqual(200);
        return res.json();
      })
      .then((res: any) => {
        expect(res.errors[0].message).toMatch("Your email is not valid");
      });
  });

  test("Email does not exist", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: mutation,
        variables: {
          email: "admin@admin.com",
          password: "123456789",
        },
      }),
    })
      .then((res: any) => {
        expect(res.status).toEqual(200);
        return res.json();
      })
      .then((res: any) => {
        expect(res.errors[0].message).toMatch("The account does not exist");
      });
  });

  test("Bad password", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: mutation,
        variables: {
          email: process.env.EMAIL_LOGIN_TEST,
          password: "123456789",
        },
      }),
    })
      .then((res: any) => {
        expect(res.status).toEqual(200);
        return res.json();
      })
      .then((res: any) => {
        expect(res.errors[0].message).toMatch("The password is incorrect");
      });
  });
});
