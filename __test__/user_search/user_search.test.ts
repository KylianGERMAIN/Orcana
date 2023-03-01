import { describe, expect, test } from "@jest/globals";
import { IUser } from "../../helpers/interface/user_interface";

import dotenv from "dotenv";
import fetch from "node-fetch";
import { CustomErrorMessage } from "../../helpers/error/error";

const query_all = `mutation user_search($username: String, $role: String) {
    user_search(username: $username, role: $role) {
      error {
        message
      }
      data {
        users {
          username
          email
          id
        }
      }
    }
  }`;

const query_role = `mutation user_search($role: String) {
    user_search(role: $role) {
      error {
        message
      }
      data {
        users {
          username
          email
          id
        }
      }
    }
  }`;

const query_username = `mutation user_search($username: String) {
  user_search(username: $username) {
    error {
      message
    }
    data {
      users {
        username
        email
        id
      }
    }
  }
}`;

dotenv.config({ path: `.env.test` });

describe("find user", () => {
    test("Success with all", () => {
        const user: IUser = {
            id: "",
            email: "",
            username: "jeanpierre",
            password: "",
            role: "administrator",
        };

        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
            },
            body: JSON.stringify({
                query: query_all,
                variables: {
                    username: user.username,
                    role: user.role,
                },
                operationName: "user_search",
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

    test("Success with role", () => {
        const user: IUser = {
            id: "",
            email: "",
            username: "",
            password: "",
            role: "administrator",
        };

        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
            },
            body: JSON.stringify({
                query: query_role,
                variables: {
                    role: user.role,
                },
                operationName: "user_search",
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

    test("Success with username", () => {
        const user: IUser = {
            id: "",
            email: "",
            username: "jeanpierre",
            password: "",
            role: "",
        };

        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
            },
            body: JSON.stringify({
                query: query_username,
                variables: {
                    username: user.username,
                },
                operationName: "user_search",
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

    test("Error with role", () => {
        const user: IUser = {
            id: "",
            email: "",
            username: "jean",
            password: "",
            role: "ghost",
        };

        return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_LOGIN_TEST}`,
            },
            body: JSON.stringify({
                query: query_all,
                variables: {
                    username: user.username,
                    role: user.role,
                },
                operationName: "user_search",
            }),
        })
            .then((res: any) => {
                expect(res.status).toEqual(200);
                return res.json();
            })
            .then((res: any) => {
                expect(res.errors[0].message).toMatch(
                    CustomErrorMessage.NO_ROLE
                );
            });
    });
});
