require("dotenv").config()
const {
  ApolloServer,
  AuthenticationError,
  UserInputError,
  gql,
  // } = require("apollo-server")
} = require("apollo-server-express")
// const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core")
const DataLoader = require("dataloader")

const express = require("express")
const http = require("http")

const { execute, subscribe } = require("graphql")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { PubSub } = require("graphql-subscriptions")

// const { v1: uuid } = require("uuid")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/libuser")

// ;(async function () {
async function startApolloServer() {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
  const MONGODB_URI = process.env.MONGODB_URI
  const PORT = process.env.PORT

  console.log("connecting to", MONGODB_URI)

  mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("connected to MongoDB")
    })
    .catch(error => {
      console.log("error connection to MongoDB:", error.message)
    })

  mongoose.set("debug", true)

  const pubsub = new PubSub()
  const typeDefs = gql`
    type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int
    }
    type Book {
      title: String!
      published: Int
      author: Author!
      genres: [String!]!
      id: ID!
    }
    type User {
      username: String!
      favoriteGenre: String
      id: ID!
    }
    type Token {
      value: String!
    }
    type Query {
      authorCount: Int!
      bookCount: Int!
      allBooks(author: String, genre: String): [Book!]
      allAuthors: [Author!]!
      me: User
    }
    type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int
        genres: [String!]!
      ): Book
      editAuthor(name: String!, setBornTo: Int!): Author
      createUser(username: String!, favoriteGenre: String): User
      login(username: String!, password: String!): Token
    }
    type Subscription {
      bookAdded: Book!
    }
  `

  const batchBookCount = async authorIds => {
    const books = await Book.find({ author: { $in: authorIds } })
    const AuthorIdsOfBooks = books.map(book => book.author.toString())
    return authorIds.map(
      uniqId => AuthorIdsOfBooks.filter(id => id === uniqId).length
    )
  }
  // const bookCountLoader = new DataLoader(batchBookCount) // new DataLoader should be initialized in object returned by apollo server context.

  const resolvers = {
    Mutation: {
      addBook: async (root, args, context) => {
        if (!context.currentUser) {
          throw new AuthenticationError("Not authenticated")
        }
        if (args.title.length < 2) {
          throw new UserInputError(
            `book title "${args.title}" (length>=2 required)  is too short!`
          )
        }
        if (args.author.length < 4) {
          throw new UserInputError(
            `author name "${args.author}" (length>=4 required) is too short!`
          )
        }

        let foundAuthor = await Author.findOne({ name: args.author })

        // if (!authors.find(author => author.name === book.author)) {
        if (!foundAuthor) {
          // const author = { name: book.author, id: uuid(), born: null }
          // authors = authors.concat(author)
          const author = new Author({ name: args.author, born: null })
          try {
            foundAuthor = await author.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }
        const book = new Book({ ...args, author: foundAuthor._id })
        // const book = { ...args, id: uuid() }
        //  books = books.concat(book)
        console.log("new book", book)

        let returnedBook
        try {
          returnedBook = await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        pubsub.publish("BOOK_ADDED", {
          bookAdded: {
            id: returnedBook._id,
            ...args,
            author: foundAuthor,
          },

          // bookAdded: returnedBook,
          // bookAdded: book,
        })

        return { id: returnedBook._id, ...args, author: foundAuthor }
      },
      editAuthor: async (root, args, { currentUser }) => {
        // const author = authors.find(author => author.name === args.name)
        // if (!author) {
        //   return null
        // }
        //      author.born = args.setBornTo // author is a reference to the found item in authors array, it would be a copy if authors.find() returns a primitive
        //   let foo = ["a", { bar: 1 }]
        //   let a = foo.find(val => val === "a")
        //   a = "b"
        //   console.log(foo[0]) //still "a"
        //   let obj = foo.find(val => val.bar)
        //   obj.bar = 2
        //   console.log(foo[1].bar) //2 - reference
        //     return author

        if (!currentUser) {
          throw new AuthenticationError("Not authenticated")
        }
        let author
        try {
          author = await Author.findOneAndUpdate(
            { name: args.name },
            { born: args.setBornTo },
            { new: true } // return the updated doc instead of the old one
          )
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      },
      createUser: (root, args) => {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre || null,
        })
        return user.save().catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      },
      login: async (root, args) => {
        const foundUser = await User.findOne({ username: args.username })

        if (!foundUser || args.password !== "secret") {
          throw new UserInputError("wrong credentials")
        }

        const userForToken = { username: foundUser.username, id: foundUser._id }

        return { value: jwt.sign(userForToken, JWT_SECRET_KEY) }
      },
    },

    Subscription: {
      bookAdded: {
        // resolve: payload => {
        //   return {
        //     // customData: payload,
        //   }
        // },
        subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
      },
    },

    Query: {
      authorCount: () => Author.count({}),
      bookCount: () => Book.count({}),
      // "query": "query { allBooks(author: \"Robert Martin\") {title} }" , note the backslash in query POST
      allBooks: (root, args) => {
        let condition
        if (args.author && !args.genre) {
          condition = book => book.author === args.author
        } else if (!args.author && args.genre) {
          // condition = book => book.genres.includes(args.genre)
          condition = { genres: { $in: args.genre } }
        } else if (args.author && args.genre) {
          condition = book =>
            book.author === args.author && book.genres.includes(args.genre)
        } else {
          return Book.find({}).populate("author", "id name born")
        }
        // return books.filter(condition)
        return Book.find(condition).populate("author", "id name born")
      },
      allAuthors: () => Author.find({}),
      me: (root, args, context) => context.currentUser,
    },
    Author: {
      // bookCount: async root => {
      //   const books = await Book.find({ author: root.id })
      //   // books.filter(book => book.author === root.name).length,
      //   return books.length
      // },
      bookCount: async (root, args, context) => {
        return await context.bookCountLoader.load(root.id)
      },
    },
  }

  const app = express()
  const corsOptions = {
    credentials: true,
  }
  //  const cors = require("cors") // apply cors in server.applyMiddleware()
  //  app.use(cors()) // to avoid such warning in browser console, `the connection to ws was interrupted while the page was loading, firefox can't establish a connection to the server at ws://localhost:4000/graphql`, shown only once.

  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  )

  const server = new ApolloServer({
    schema,

    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.slice(7), JWT_SECRET_KEY)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser, bookCountLoader: new DataLoader(batchBookCount) }
      }
    },

    //  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    cors: corsOptions,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    // path: "/",
  })

  // httpServer.listen(4000, () => {
  //   console.log(`Server is now running on 4000`)
  // })

  // await new Promise(resolve =>
  //   httpServer.listen({ port: process.env.PORT }, resolve)
  // )
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    )
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    )
  })

  //console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)

  // httpServer.listen({ port: 4000 })

  // server.listen().then(({ url }) => {
  //   console.log(`Server ready at ${url}`)
  // })
}
// })()

startApolloServer()
