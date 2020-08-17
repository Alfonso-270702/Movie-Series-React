const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../redis");

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
  }

  input newMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  input editMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  type removeMessage {
    msg: String
  }

  type editMessage {
    msg: String
  }

  extend type Mutation {
    addMovie(movie: newMovie): Movie
    removeMovie(id: String): removeMessage
    editMovie(id: String, movie: editMovie): editMessage
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const cache = await redis.get("movies");
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios({
            method: "get",
            url: "http://localhost:5001/movies",
          });
          await redis.set("movies", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addMovie: async (parent, args, context, info) => {
      const { title, overview, popularity, poster_path, tags } = args.movie;
      try {
        const { data } = await axios({
          url: "http://localhost:5001/movies",
          method: "post",
          data: {
            title,
            overview,
            popularity,
            poster_path,
            tags,
          },
        });
        const { oldData } = await axios.get("http://localhost:5001/movies");
        await redis.set("movies", JSON.stringify(oldData));
        return data[0];
      } catch (error) {
        console.log(error);
      }
    },
    removeMovie: async (parent, args, context, info) => {
      const _id = args.id;
      try {
        const { data } = await axios({
          url: `http://localhost:5001/movies/${_id}`,
          method: "delete",
        });
        const { oldData } = await axios.get("http://localhost:5001/movies");
        await redis.set("movies", JSON.stringify(oldData));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editMovie: async (parent, args, context, info) => {
      const _id = args.id;
      const { title, overview, popularity, poster_path, tags } = args.movie;
      try {
        const { data } = await axios({
          url: `http://localhost:5001/movies/${_id}`,
          method: "put",
          data: {
            title,
            overview,
            popularity,
            poster_path,
            tags,
          },
        });
        const { oldData } = await axios.get("http://localhost:5001/movies");
        await redis.set("movies", JSON.stringify(oldData));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
