import { InMemoryCache,ApolloClient, ApolloProvider}from "@apollo/client"
import FirstBook from "./components/FirstBook"
function App() {

const client = new ApolloClient({
  uri : "http://localhost:5000/graphql",
  cache : new InMemoryCache()
})
  return (
 <>
 <ApolloProvider client={ client}>

<FirstBook/>

 <h1 className=" text-red-500"> text</h1>
 </ApolloProvider>
 </>
  )
}

export default App
