
import graphql, { GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt } from "graphql"
import bookData from "../bookData.json" assert { type: "json" };

const {GraphQLObjectType}= graphql


// Define the TokenType
const TokenType = new GraphQLObjectType({
    name: "Token",
    fields: () => ({
      position: { type: new GraphQLList(GraphQLInt) },
      value: { type: GraphQLString }
    })
  });
  
  // Define the PageType
  const PageType = new GraphQLObjectType({
    name: "Page",
    fields: () => ({
      pageIndex: { type: GraphQLInt },
      content: { type: GraphQLString },
      tokens: { type: new GraphQLList(TokenType) }
    })
  });
  
  // Define the BookType
  const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
      title: { type: GraphQLString },
      author: { type: GraphQLString },
      pages: { type: new GraphQLList(PageType) }
    })
  });
  
  // Define the RootQuery
  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      book: {
        type: BookType,
        resolve(parent, args) {
          return bookData;
        }
      }
    }
  });




const schema = new GraphQLSchema({
    query: RootQuery
});

export default schema;