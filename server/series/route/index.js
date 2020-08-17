const route = require("express").Router();
const TvSeriesController = require("../controller/tvSeries");

route.get("/tv-series", TvSeriesController.findTvSeries);
route.post("/tv-series", TvSeriesController.addTvSeries);
route.put("/tv-series/:id", TvSeriesController.updatedTvSeries);
route.delete("/tv-series/:id", TvSeriesController.deleteTvSeries);

module.exports = route;
