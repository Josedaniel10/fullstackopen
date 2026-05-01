import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import { ALL_PERSONS } from "./queries.js"
import { setContext } from "@apollo/client/link/context"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("phonenumbers-user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
})

const httpLink = createHttpLink({
  uri: "http://localhost:4001",
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

/* client.query({ ALL_PERSONS }).then((response) => {
  console.log(response.data)
}) */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
