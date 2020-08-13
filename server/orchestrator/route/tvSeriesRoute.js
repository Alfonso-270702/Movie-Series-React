const route = require("express").Router();
const TvSeriesOrchestrator = require("../controllers/tvSeries");

route.get("/", TvSeriesOrchestrator.getTvSeries);
route.post("/", TvSeriesOrchestrator.addTvSeries);
route.put("/:id", TvSeriesOrchestrator.editTvSeries);
route.delete("/:id", TvSeriesOrchestrator.deleteTvSeries);

module.exports = route;
