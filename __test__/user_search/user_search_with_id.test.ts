import { describe, expect, test } from "@jest/globals";
import { User } from "../../helpers/interface/userInterface";

import dotenv from "dotenv";
import fetch from "node-fetch";
import { CustomErrorMessage } from "../../helpers/error/error";

const query = `mutation user_search_with_id($user_id: String) {
    user_search_with_id(user_id: $user_id) {
      data {
        user {
          id
          email
          username
        }
      }
      error {
        message
      }
    }
  }`;

dotenv.config({ path: `.env.test` });

describe("find user", () => {
    test("Success", () => {
        const user: User = {
            id: "63999a2510ab31370e484650",
            email: "",
            username: "",
            password: "",
        };

        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    user_id: user.id,
                },
                operationName: "user_search_with_id",
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

    test("Error", () => {
        const user: User = {
            id: "63999a2510ab31370e484651",
            email: "",
            username: "",
            password: "",
        };

        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    user_id: user.id,
                },
                operationName: "user_search_with_id",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toMatch(
                    CustomErrorMessage.NO_USER_WITH_ID
                );
            });
    });
});
