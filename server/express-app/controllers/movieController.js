const Movie = require("../models/movie");

class MovieController {
  static findMovie(req, res, next) {
    Movie.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ msg: "Internal Server Error" });
      });
  }

  static addMovie(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    Movie.create({ title, overview, poster_path, popularity, tags })
      .then((data) => {
        res.status(200).json(data.ops);
      })
      .catch((err) => {
        res.status(500).json({ msg: "Internal Server Error" });
      });
  }

  static updatedMovie(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    Movie.update(req.params.id, {
      title,
      overview,
      poster_path,
      popularity,
      tags,
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ msg: "Internal Server Error" });
      });
  }

  static removeMovie(req, res, next) {
    Movie.deleteMovie(req.params.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ msg: "Internal Server Error" });
      });
  }
}

module.exports = MovieController;
