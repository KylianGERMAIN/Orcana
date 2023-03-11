import { describe, expect, test } from "@jest/globals";

import dotenv from "dotenv";
import fetch from "node-fetch";
import { CustomErrorMessage } from "../../helpers/error/error";

const query = `mutation get_chat($page: Int) {
    get_chat(page: $page) {
      chats {
        message
        receiver_id
        sender_id
        date
        id
      }
      error {
        message
      }
      pagination {
        page
        page_size
        page_count
        total
      }
    }
  }`;

dotenv.config({ path: `.env.test` });

describe("get_all_chat", () => {
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
                    page: 1,
                },
                operationName: "get_chat",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(Array.isArray([res.data.get_chat.chats])).toBe(true);
                expect(res.errors).toBe(undefined);
            });
    });

    test("Failed authorization", () => {
        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer lol`,
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    page: 1,
                },
                operationName: "get_chat",
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

    test("Failed pagination", () => {
        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    page: -1,
                },
                operationName: "get_chat",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toMatch(
                    CustomErrorMessage.PAGINATION_CHAT
                );
            });
    });
});
