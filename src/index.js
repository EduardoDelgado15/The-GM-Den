const { ApolloServer, gql } = require("apollo-server");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const { DB_URI, DB_NAME } = process.env;

//process.env.DB_URI

const books = [
  {
    title: "The Awejojujnbhjk",
    author: "Kate Chopinhuhhuynjh",
  },
  {
    title: "City ofjhghvhjjjj jkdfvncjvn  Glass",
    author: "Paul Auster",
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: (root,data,context) => {
      console.log(context.db);
      return books;
    },
  },
};

const start = async () => {
  const client = new MongoClient(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(DB_NAME);

  const context ={
    db,
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();
