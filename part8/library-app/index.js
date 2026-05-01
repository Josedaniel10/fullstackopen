require("dotenv").config()

const { ApolloServer } = require("@apollo/server")
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer")
const { expressMiddleware } = require("@as-integrations/express5")
const cors = require("cors")
const express = require("express")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { createServer } = require("http")
const jwt = require("jsonwebtoken")
const connectToDatabase = require("./db.js")
const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/use/ws")

const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const User = require("./models/User.js")

// Obtener el usuario desde la autenticación por token
const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null
  }

  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
  return await User.findById(decodedToken.id)
}

// 1. Conectar a Mongoose
connectToDatabase(process.env.MONGODB_URI)

// 2. Contruir el Schema ejecutable
const schema = makeExecutableSchema({ typeDefs, resolvers })

// 3. Crear express y el servidor HTTP
const app = express()
const httpServer = createServer(app)

// 4. Crear el servidor WebSocket
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
})

const wsSeverCleanup = useServer({ schema }, wsServer)

// 5. Crear el Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [
    // Cierra el servidor HTTP limpiamente al apagar
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Cierra el servidor WebSocket limpiamente al apagar
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await wsSeverCleanup.dispose()
          },
        }
      },
    },
  ],
})

// 6. Arrancar Apollo y conectarlo a Express
const startServer = async () => {
  await server.start()

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization
        const currentUser = await getUserFromAuthHeader(auth)
        return { currentUser }
      },
    }),
  )

  // 7. Arrancar el servidor HTTP
  httpServer.listen(process.env.PORT || 4000, () => {
    console.log(
      `🚀 Servidor listo en http://localhost:${process.env.PORT || 4000}/graphql`,
    )
    console.log(
      `🔌 WebSocket listo en ws://localhost:${process.env.PORT || 4000}/graphql`,
    )
  })
}

startServer()
