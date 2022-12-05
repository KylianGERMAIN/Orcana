import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

},
{timestamps:true}
);

export const OrcanaModel= mongoose.model("users", ArticleSchema);