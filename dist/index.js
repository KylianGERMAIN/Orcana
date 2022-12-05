"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const typeDef_1 = require("./typeDefs/typeDef");
const UserResolver_1 = require("./resolver/UserResolver");
const dotenv = require('dotenv');
dotenv.config();
function listen(port) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        var uri = `mongodb+srv://Kylian_Germain:${process.env.PASSWORD_DB}@cluster0.kzymlgf.mongodb.net/Orcana?retryWrites=true&w=majority`;
        //@ts-ignore
        mongoose_1.default.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(() => console.log("connected to newmango db"));
        app.get("/", (req, res) => {
            res.json({
                data: "API is working...",
            });
        });
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDef_1.typeDefs,
            resolvers: UserResolver_1.resolvers,
        });
        yield server.start();
        server.applyMiddleware({ app });
        app.listen(port, () => {
            console.log(` Server is running at http://localhost:${port}/graphql`);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield listen(4000);
        }
        catch (err) {
            console.error('💀 Error starting the node server', err);
        }
    });
}
void main();
