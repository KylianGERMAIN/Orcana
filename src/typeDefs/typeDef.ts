import { gql } from 'apollo-server-express';

export const typeDefs = 
gql`
    type Item{
        email:String,
        password:String
    }

    type Error{
        message:String
    }

    type ItemResponse{
        item:Item
        error:Error
    }

    type Query {
        defaultPost:String,
        getItems:[Item]
    },

    type Mutation{
        addItem(email:String,password:String):ItemResponse
    }
`;