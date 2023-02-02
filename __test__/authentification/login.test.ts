import { describe, expect, test } from "@jest/globals";
import { CustomErrorMessage } from "../../helpers/error/error";

import dotenv from "dotenv";
import fetch from "node-fetch";

const mutation = `mutation login($password: String, $email: String) {
  login(password: $password, email: $email) {
    access_token
    error {
      message
    }
    expires_in
    refresh_token
    token_type
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
                operationName: "login",
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
                operationName: "login",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toMatch(
                    CustomErrorMessage.INVALID_EMAIL
                );
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
                operationName: "login",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toMatch(
                    CustomErrorMessage.NO_USER
                );
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
                operationName: "login",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toMatch(
                    CustomErrorMessage.BAD_PASSWORD
                );
            });
    });
});
