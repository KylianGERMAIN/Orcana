import { describe, expect, test } from "@jest/globals";
import { IUser } from "../../helpers/interface/user_interface";

import dotenv from "dotenv";
import fetch from "node-fetch";

const query = `mutation register($email: String, $username: String, $password: String) {
    register(email: $email, username: $username, password: $password) {
      access_token
      expires_in
      refresh_token
      token_type
      error {
        message
      }
    }
  }`;

const clean = `query delete_account {
    delete_account {
      error {
        message
      }
    }
  }`;

dotenv.config({ path: `.env.test` });

describe("deleteAccount", () => {
    test("Success", () => {
        const user: IUser = {
            id: "",
            email: "test@hotmail.com",
            username: "test_test",
            password: "test1234",
            role: "",
        };

        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    email: user.email,
                    username: user.username,
                    password: user.password,
                },
                operationName: "register",
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
                        Authorization: `Bearer ${res.data.register.access_token}`,
                    },
                    body: JSON.stringify({
                        query: clean,
                        operationName: "delete_account",
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
                query: clean,
                operationName: "delete_account",
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
