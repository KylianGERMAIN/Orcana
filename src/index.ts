import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import mongoose  from 'mongoose';
import { typeDefs } from './typeDefs/typeDef';
import { resolvers } from "./resolvers/resolver";


const dotenv = require('dotenv');
dotenv.config()


async function listen(port: number) {
  const app = express()

  var uri = process.env.LINK_DB;

  //@ts-ignore
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(()=>console.log("connected to newmango db"))


  app.get("/", (req, res) => {
    res.json({
        data: "API is working...",
      });
    });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await server.start();

  server.applyMiddleware({ app });

  app.listen(port, () => {
      console.log(` Server is running at http://localhost:${port}/graphql`);
  });
}

async function main() {
  try {
    await listen(4000)
  } catch (err) {
    console.error('💀 Error starting the node server', err)
  }
}


void main()