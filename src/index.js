const { ApolloServer } = require("apollo-server");
const gql = require('graphql-tag');
//const { Query } = require("mongoose");


const typeDefs = gql `
  type Query {
    SayHi: String!
  }
`

const resolvers = {
  Query: {
    sayHi: () => 'Hello Everyone'
  }
}

const server = new ApolloServer((
  typeDefs,
  resolvers
));

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)}
};