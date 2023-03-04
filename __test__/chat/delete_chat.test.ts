import { describe, expect, test } from "@jest/globals";

import dotenv from "dotenv";
import fetch from "node-fetch";
import { CustomErrorMessage } from "../../helpers/error/error";

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

describe("delete_chat", () => {
    test("Success", async () => {
        let res: any = await fetch("http://localhost:4000/graphql", {
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
        });
        res = await res.json();
        await fetch("http://localhost:4000/graphql", {
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

    test("no exist", async () => {
        await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
            },
            body: JSON.stringify({
                query: clean,
                variables: {
                    deleteChatId: "63999a2510ab31370e484659",
                },
                operationName: "delete_chat",
            }),
        })
            .then((resu: any) => {
                expect(resu.status).toEqual(200);
                return resu.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toBe(
                    CustomErrorMessage.REMOVE_A_CHAT_THAT_DOESNT_EXIST
                );
            });
    });
});
