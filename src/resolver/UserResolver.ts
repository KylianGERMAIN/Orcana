import { OrcanaModel } from "../models/UserModel";
export const resolvers = {
  Query: {
    defaultPost: () => "eat your vegetables",
    getItems: async () => {
      const chats = await OrcanaModel.find({});
      console.log("holt output ======", chats);
      return chats;
    },
  },
  Mutation: {
  addItem: async (parent: any, { email, password }: any, context: any, info: any) => {

   let item={}
   let error={}  

   try {
      const newItem = await new OrcanaModel({email, password});
      item=await newItem.save()
      console.log("item  ==== ",item)
    }
    catch(e) {
      console.log("addTest error response =====", e);
      error }
       return {
        item:item,
        error:{
         //@ts-ignore
          message:error.message
        }
      };
    },
  },
};
