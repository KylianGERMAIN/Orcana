"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrcanaModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
}, 
//add this for auto createdAt and updatedat fields
{ timestamps: true });
exports.OrcanaModel = mongoose_1.default.model("Article", ArticleSchema);
