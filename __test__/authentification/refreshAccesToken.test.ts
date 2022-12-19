import { describe, expect, test } from "@jest/globals";

const dotenv = require("dotenv");
const fetch = require("node-fetch");

const query = `query Query {
  refreshAccessToken {
    accessToken
    error {
      message
    }
    expires_in
    tokenType
  }
}`;

dotenv.config({ path: `.env.test` });

describe("RefreshAccesToken", () => {
  test("Success", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REFRESH_TOKEN_LOGIN_TEST}`,
      },
      body: JSON.stringify({
        query: query,
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

  test("No Authorization", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res: any) => {
        expect(res.status).toEqual(200);
        return res.json();
      })
      .then((res: any) => {
        expect(res.errors[0].message).toMatch("No authorization");
      });
  });

  test("no Bearer", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.REFRESH_TOKEN_LOGIN_TEST}`,
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res: any) => {
        expect(res.status).toEqual(200);
        return res.json();
      })
      .then((res: any) => {
        expect(res.errors[0].message).toMatch(
          "Your authorization bearer token is not valid"
        );
      });
  });
});
