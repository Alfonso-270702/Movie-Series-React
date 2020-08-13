const redis = require("../redis");
const axios = require("axios");

class TvSeriesController {
  static async getTvSeries(req, res) {
    try {
      const cache = await redis.get("tv-series");
      if (cache) {
        res.json(JSON.parse(cache));
      } else {
        const { data } = await axios.get("http://localhost:5002/tv-series");
        await redis.set("tv-series", JSON.stringify(data));
        res.json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async addTvSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const addTvSeries = await axios({
        method: "post",
        url: "http://localhost:5002/tv-series",
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        },
      });
      const { data } = await axios.get("http://localhost:5002/tv-series");
      await redis.set("tv-series", JSON.stringify(data));
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async editTvSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    try {
      const editTvSeries = await axios({
        method: "put",
        url: `http://localhost:5002/tv-series/${req.params.id}`,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        },
      });
      const { data } = await axios.get("http://localhost:5002/tv-series");
      await redis.set("tv-series", JSON.stringify(data));
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteTvSeries(req, res) {
    try {
      const deleteTvSeries = await axios({
        method: "delete",
        url: `http://localhost:5002/tv-series/${req.params.id}`,
      });
      const { data } = await axios.get("http://localhost:5002/tv-series");
      await redis.set("tv-series", JSON.stringify(data));
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TvSeriesController;
