import express from "express"
import dotenv from "dotenv"
import { graphqlHTTP } from "express-graphql"
import schema from "./schema/schema.js"
import cors from "cors"

dotenv.config()
const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use("/graphql", graphqlHTTP({

    schema,
    graphiql: process.env.NODE_ENV= " development"
}))

app.listen(port,console.log(`server running at ${port}`))