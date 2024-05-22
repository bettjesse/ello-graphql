import { projects,clients } from "../sampleData.js";
import graphql, { GraphQLID, GraphQLString, GraphQLSchema } from "graphql"

const {GraphQLObjectType}= graphql

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields : ()=> ({
        id : {type: GraphQLID},
        name : {type: GraphQLString},
        id : {type: GraphQLString},
        id : {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields : {
        client :{
            type : ClientType,
            args : {id: {type: GraphQLID}},
            resolve(parent, args) {
                return clients.find(client=> client.id === args.id)
            }
        }
    }

})
const schema = new GraphQLSchema({
    query: RootQuery
});

export default schema;