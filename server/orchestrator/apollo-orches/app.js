const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const moviesSchema = require("./schema/movieSchema");
const serisSchema = require("./schema/seriesSchema");

const typeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, moviesSchema.typeDefs, serisSchema.typeDefs],
  resolvers: [moviesSchema.resolvers, serisSchema.resolvers],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Server ready at: ${url}`);
});
