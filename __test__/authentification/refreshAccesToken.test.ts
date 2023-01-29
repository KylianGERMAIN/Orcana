import { describe, expect, test } from "@jest/globals";
import { CustomErrorMessage } from "../../helpers/Error/error";

import dotenv from "dotenv";
import fetch from "node-fetch";

const query = `query refreshAccessToken {
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
                operationName: "refreshAccessToken",
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
                operationName: "refreshAccessToken",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toMatch(
                    CustomErrorMessage.NO_AUTHORIZATION
                );
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
                operationName: "refreshAccessToken",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toMatch(
                    CustomErrorMessage.INVALID_TOKEN
                );
            });
    });
});
