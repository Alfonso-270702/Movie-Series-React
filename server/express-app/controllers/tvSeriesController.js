const TvSeries = require("../models/tvSeries");

class TvSeriesController {
  static findTvSeries(req, res, next) {
    TvSeries.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ msg: "Internal Server Error" });
      });
  }

  static addTvSeries(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    TvSeries.create({ title, overview, poster_path, popularity, tags })
      .then((data) => {
        res.status(200).json(data.ops);
      })
      .catch((err) => {
        res.status(500).json({ msg: "Internal Server Error" });
      });
  }

  static updatedTvSeries(req, res, next) {
    TvSeries.update(req.params.id, req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ msg: "Internal Server Error" });
      });
  }

  static deleteTvSeries(req, res, next) {
    TvSeries.delete(req.params.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ msg: "Internal Server Error" });
      });
  }
}

module.exports = TvSeriesController;
