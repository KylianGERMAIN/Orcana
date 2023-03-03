import { describe, expect, test } from "@jest/globals";
import { CustomErrorMessage } from "../../helpers/error/error";

import dotenv from "dotenv";
import fetch from "node-fetch";

const mutation = `mutation create_chat($receiverId: String, $message: String) {
    create_chat(receiver_id: $receiverId, message: $message) {
      receiver_id
      message
      id
      error {
        message
      }
    }
  }`;

const clean = `mutation delete_chat($deleteChatId: String) {
    delete_chat(id: $deleteChatId) {
      error {
        message
      }
    }
  }`;

dotenv.config({ path: `.env.test` });

describe("create_chat", () => {
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
                    receiverId: "63999a2510ab31370e484650",
                    message: "Bonjour j'envoie un message à moi même",
                },
                operationName: "create_chat",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors).toBe(undefined);
                fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
                    },
                    body: JSON.stringify({
                        query: clean,
                        variables: {
                            deleteChatId: res.data.create_chat.id,
                        },
                        operationName: "delete_chat",
                    }),
                })
                    .then((resu: any) => {
                        expect(resu.status).toEqual(200);
                        return resu.json();
                    })
                    .then((resu: any) => {
                        expect(resu.errors).toBe(undefined);
                    });
            });
    });

    test("Failed no message", () => {
        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
            },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    receiverId: "",
                    message: "",
                },
                operationName: "create_chat",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toMatch(
                    CustomErrorMessage.CHAT_EMPTY
                );
            });
    });

    test("No receiver", () => {
        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
            },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    receiverId: "63999a2510ab31370e484659",
                    message: "Ce message ne sera jamais envoyé",
                },
                operationName: "create_chat",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toBe(
                    CustomErrorMessage.NO_USER_WITH_ID
                );
            });
    });
});
