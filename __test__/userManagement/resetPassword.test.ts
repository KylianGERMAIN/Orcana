import { describe, expect, test } from "@jest/globals";

import dotenv from "dotenv";
import fetch from "node-fetch";

const query = `mutation Mutation($newPassword: String) {
  resetPassword(newPassword: $newPassword) {
    error {
      message
    }
  }
}`;

dotenv.config({ path: `.env.test` });

describe("reset Password", () => {
  test("Success", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {
          newPassword: "mynewpassword",
        },
      }),
    })
      .then((res: any) => {
        return res.json();
      })
      .then((res: any) => {
        fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
          },
          body: JSON.stringify({
            query: query,
            variables: {
              newPassword: process.env.PASSWORD_LOGIN_TEST,
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
  });

  test("invalid token", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer lol`,
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
        expect(res.errors[0].message).toMatch("jwt malformed");
      });
  });
});
