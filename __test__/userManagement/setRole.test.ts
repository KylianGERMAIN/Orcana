import { describe, expect, test } from "@jest/globals";
import { CustomErrorMessage } from "../../helpers/Error/error";

const dotenv = require("dotenv");
const fetch = require("node-fetch");

const mutation = `mutation SetRole($user_id: String, $role: String) {
  setRole(user_id: $user_id, role: $role) {
    error {
      message
    }
  }
}`;

dotenv.config({ path: `.env.test` });

describe("set Role", () => {
  test("Success", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          user_id: process.env.ID_LOGIN_TEST,
          role: "administrator",
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

  test("role not existe", () => {
    return fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          user_id: process.env.ID_LOGIN_TEST,
          role: "ghost",
        },
      }),
    })
      .then((res: any) => {
        expect(res.status).toEqual(200);
        return res.json();
      })
      .then((res: any) => {
        expect(res.errors[0].message).toMatch(
            CustomErrorMessage.CANT_ASSIGN_ROLE
        );
      });
  });
});
