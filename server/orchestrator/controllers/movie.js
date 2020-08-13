const redis = require("../redis");
const axios = require("axios");

class MovieOrchestrator {
  static async getMovie(req, res) {
    try {
      const cache = await redis.get("movies");
      if (cache) {
        res.json(JSON.parse(cache));
      } else {
        const { data } = await axios.get("http://localhost:5001/movies");
        await redis.set("movies", JSON.stringify(data));
        res.json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async addMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const addMovie = await axios({
        method: "post",
        url: "http://localhost:5001/movies",
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        },
      });
      const { data } = await axios.get("http://localhost:5001/movies");
      await redis.set("movies", JSON.stringify(data));
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async editMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const editMovie = await axios({
        method: "put",
        url: `http://localhost:5001/movies/${req.params.id}`,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        },
      });
      const { data } = await axios.get("http://localhost:5001/movies");
      await redis.set("movies", JSON.stringify(data));
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteMovie(req, res) {
    try {
      const deleteMovie = await axios({
        method: "delete",
        url: `http://localhost:5001/movies/${req.params.id}`,
      });
      const { data } = await axios.get("http://localhost:5001/movies");
      await redis.set("movies", JSON.stringify(data));
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MovieOrchestrator;
