const route = require("express").Router();
const TvSeriesController = require("../controllers/tvSeriesController");

route.get("/", TvSeriesController.findTvSeries);
route.post("/", TvSeriesController.addTvSeries);
route.put("/:id", TvSeriesController.updatedTvSeries);
route.delete("/:id", TvSeriesController.deleteTvSeries);

module.exports = route;
