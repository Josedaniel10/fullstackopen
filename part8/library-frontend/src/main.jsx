import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  createHttpLink,
  split,
} from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import App from "./App.jsx"
import { setContext } from "@apollo/client/link/context"
import { getMainDefinition } from "@apollo/client/utilities"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
})

// 1. Link HTTP para queries y mutations normales

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

// 2. Link WebSocket para subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
  }),
)

// 3. Split: decidir qué link usar según la operación

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  authLink.concat(httpLink),
)

// 4. Crear el client Apollo

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
