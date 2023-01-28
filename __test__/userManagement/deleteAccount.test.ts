import { describe, expect, test } from "@jest/globals";
import { User } from "../../helpers/interface/userInterface";
import { findUserWithEmail } from "../../helpers/database/userRequest";

import dotenv from "dotenv";
import fetch from "node-fetch";

const query = `mutation Register($email: String, $username: String, $password: String) {
    register(email: $email, username: $username, password: $password) {
      accessToken
      expires_in
      refreshToken
      tokenType
      error {
        message
      }
    }
  }`;

const clean = `query Error {
    deleteAccount {
      error {
        message
      }
    }
  }`;

dotenv.config({ path: `.env.test` });

describe("deleteAccount", () => {
    test("Success", () => {
        const user: User = {
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
                        Authorization: `Bearer ${res.data.register.accessToken}`,
                    },
                    body: JSON.stringify({
                        query: clean,
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
