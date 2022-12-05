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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const UserModel_1 = require("../models/UserModel");
exports.resolvers = {
    Query: {
        defaultPost: () => "eat your vegetables",
        getItems: () => __awaiter(void 0, void 0, void 0, function* () {
            const chats = yield UserModel_1.OrcanaModel.find({});
            console.log("holt output ======", chats);
            return chats;
        }),
    },
    Mutation: {
        //shape of params (parent,args, context, info)
        addItem: (parent, { email, password }, context, info) => __awaiter(void 0, void 0, void 0, function* () {
            let item = {};
            let error = {};
            try {
                const newItem = yield new UserModel_1.OrcanaModel({
                    email,
                    password,
                });
                item = yield newItem.save();
                console.log("item  ==== ", item);
            }
            catch (e) {
                console.log("addTest error response =====", e);
                error;
            }
            return {
                email: email,
                error: {
                    //@ts-ignore
                    message: error.message
                }
            };
        }),
    },
};
