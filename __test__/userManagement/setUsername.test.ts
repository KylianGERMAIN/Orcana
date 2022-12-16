import { describe, expect, test } from "@jest/globals";

const dotenv = require("dotenv");
const fetch = require("node-fetch");

const mutation = `mutation Mutation($username: String) {
  setUsername(username: $username) {
    error {
      message
    }
  }
}`;

dotenv.config({ path: `.env.test` });

describe("set Username", () => {
  test("Success", async () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          username: Math.random().toString(36),
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

  test("username not exist", async () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {},
      }),
    })
      .then((res: any) => {
        expect(res.status).toEqual(200);
        return res.json();
      })
      .then((res: any) => {
        expect(res.errors[0].message).toMatch(
          "username does not exist or is too short"
        );
      });
  });

  test("username too short", async () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          username: "1",
        },
      }),
    })
      .then((res: any) => {
        expect(res.status).toEqual(200);
        return res.json();
      })
      .then((res: any) => {
        expect(res.errors[0].message).toMatch(
          "username does not exist or is too short"
        );
      });
  });
});
