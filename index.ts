import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs/typeDef";
import { resolvers } from "./resolvers/resolver";
import dotenv from "dotenv";

dotenv.config();

async function listen(port: number) {
    const app = express();
    // app.set("trust proxy", true);

    const uri = process.env.LINK_DB;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    mongoose.set("strictQuery", false);
    mongoose
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("connected to newmango db"));

    app.get("/", (req, res) => {
        res.json({
            data: "API is working...",
        });
    });

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            return req;
        },
    });

    await server.start();

    server.applyMiddleware({ app });

    app.listen(port, () => {
        console.log(` Server is running at http://localhost:${port}/graphql`);
    });
}

async function main() {
  try {
    await listen(4000);
  } catch (err) {
    console.error("💀 Error starting the node server", err);
  }
}

void main();
