const { GraphQLError, subscribe } = require("graphql")
const jwt = require("jsonwebtoken")
const Book = require("./models/Book.js")
const User = require("./models/User.js")
const Author = require("./models/Author.js")
const { PubSub } = require("graphql-subscriptions")

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genres) {
        return Book.find({}).populate("author")
      }

      if (args.author && args.genres) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: author._id, genres: args.genres }).populate(
          "author",
        )
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: author._id }).populate("author")
      }

      return Book.find({ genres: args.genres }).populate("author")
    },
    allAuthors: async () => {
      return Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    addBook: async (root, { author, ...args }, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      if (args.title.length < 5) {
        throw new GraphQLError(
          'The "title" field must be at least 5 characters',
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
            },
          },
        )
      }

      if (author.length < 5) {
        throw new GraphQLError(
          'the "author" field must be at least 5 characters',
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
            },
          },
        )
      }

      const foundAuthor = await Author.findOne({ name: author })
      try {
        const newAuthor = !foundAuthor
          ? new Author({ name: author })
          : foundAuthor
        !foundAuthor && (await newAuthor.save())

        const book = new Book({ author: newAuthor, ...args })
        const newBook = await book.save()
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook })
        return newBook
      } catch (error) {
        throw new GraphQLError("Saved book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.born

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const foundUser = await User.findOne({ username })
      if (foundUser) {
        throw new GraphQLError("This user already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: username,
          },
        })
      }
      const user = new User({ username, favoriteGenre })
      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, { username, password }) => {
      const foundUser = await User.findOne({ username })
      if (!foundUser || password !== "fjgh") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: foundUser.username,
        id: foundUser._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Author: {
    bookCount: async (author) => {
      return await Book.countDocuments({ author: author._id })
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
