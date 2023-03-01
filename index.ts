/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloServer } from "@apollo/server";
import express from "express";
import mongoose from "mongoose";
import { typeDefs } from "./type_defs/type_def";
import { resolvers } from "./resolvers/resolver";
import dotenv from "dotenv";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const PORT = 4000;

async function main() {
    const uri = process.env.LINK_DB;

    mongoose.set("strictQuery", false);
    mongoose
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("connected to newmango db"));

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const app = express();
    const httpServer = createServer(app);
    const context = (ctx: any) => ctx.req;

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
    });
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
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
        expressMiddleware(server, { context })
    );

    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Query endpoint ready at http://localhost:${PORT}/graphql`
        );
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`
        );
    });
}

main();
