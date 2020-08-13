const route = require("express").Router();
const movieRoute = require("./movieRoute");
const tvSeriesRoute = require("./tvSeriesRoute");

route.use("/movies", movieRoute);
route.use("/tv-series", tvSeriesRoute);

module.exports = route;
