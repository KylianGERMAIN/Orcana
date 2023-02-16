/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloServer } from "@apollo/server";
import express from "express";
import mongoose from "mongoose";
// import { typeDefs } from "./type_defs/type_def";
import { resolvers } from "./resolvers/resolver";
import dotenv from "dotenv";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { PubSub } from "graphql-subscriptions";
import bodyParser from "body-parser";

dotenv.config();

const PORT = 4000;

async function main() {
    // Schema definition
    const typeDefs = `#graphql
      type Query {
        currentNumber: Int
      }

      type Subscription {
        numberIncremented: Int
      }
    `;

    // Resolver map
    // const resolvers = {
    //     Query: {
    //         currentNumber() {
    //             return currentNumber;
    //         },
    //     },
    //     Subscription: {
    //         numberIncremented: {
    //             subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
    //         },
    //     },
    // };

    const uri = process.env.LINK_DB;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    mongoose.set("strictQuery", false);
    mongoose
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("connected to newmango db"));

    // Create schema, which will be used separately by ApolloServer and
    // the WebSocket server.
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Create an Express app and HTTP server; we will attach the WebSocket
    // server and the ApolloServer to this HTTP server.
    const app = express();
    const httpServer = createServer(app);

    // Set up WebSocket server.
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
    });
    const serverCleanup = useServer({ schema }, wsServer);

    // Set up ApolloServer.
    const server = new ApolloServer({
        schema,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    await server.start();
    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        expressMiddleware(server)
    );

    // Now that our HTTP server is fully set up, actually listen.
    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Query endpoint ready at http://localhost:${PORT}/graphql`
        );
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`
        );
    });

    // In the background, increment a number every second and notify subscribers when it changes.
}

main();
