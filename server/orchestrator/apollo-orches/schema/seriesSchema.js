const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../redis");

const typeDefs = gql`
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  extend type Query {
    serie: [Series]
  }
  input newSeries {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }
  input editSeries {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }
  type removedMessage {
    msg: String
  }

  type editedMessage {
    msg: String
  }
  extend type Mutation {
    addSeries(serie: newSeries): Series
    removeSeries(id: String): removedMessage
    editSeries(id: String, series: editSeries): editedMessage
  }
`;

const resolvers = {
  Query: {
    serie: async () => {
      try {
        const cache = await redis.get("tv-series");

        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios({
            method: "get",
            url: "http://localhost:5002/tv-series",
          });

          await redis.set("tv-series", JSON.stringify(data));

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addSeries: async (parent, args, context, info) => {
      const { title, overview, popularity, poster_path, tags } = args.serie;
      try {
        const { data } = await axios({
          url: "http://localhost:5002/tv-series",
          method: "post",
          data: {
            title,
            overview,
            popularity,
            poster_path,
            tags,
          },
        });

        const { oldData } = await axios.get("http://localhost:5002/tv-series");

        await redis.set("tv-series", JSON.stringify(oldData));

        return data[0];
      } catch (error) {
        console.log(error);
      }
    },
    removeSeries: async (parent, args, context, info) => {
      const _id = args.id;
      try {
        const { data } = await axios({
          url: `http://localhost:5002/tv-series/${_id}`,
          method: "delete",
        });

        const { oldData } = await axios.get("http://localhost:5002/tv-series");

        await redis.set("tv-series", JSON.stringify(oldData));

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editSeries: async (parent, args, context, info) => {
      const { title, overview, popularity, poster_path, tags } = args.serie;
      const _id = args.id;
      try {
        const { data } = await axios({
          url: `http://localhost:5002/tv-series/${_id}`,
          method: "post",
          data: {
            title,
            overview,
            popularity,
            poster_path,
            tags,
          },
        });

        const { oldData } = await axios.get("http://localhost:5002/tv-series");

        await redis.set("tv-series", JSON.stringify(oldData));

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
