const route = require("express").Router();
const TvSeriesController = require("../controller/tvSeries");

route.get("/tv-series", TvSeriesController.findTvSeries);
route.post("/tv-series", TvSeriesController.addTvSeries);
route.put("/tv-series", TvSeriesController.updatedTvSeries);
route.delete("/tv-series", TvSeriesController.deleteTvSeries);

module.exports = route;
