const route = require("express").Router();
const movieRoute = require("./movie");
const tvSeriesRoute = require("./tvSeriesRoute");

route.get("/", (req, res) => {
  res.send("Welcome");
});

route.use("/movies", movieRoute);
route.use("/tv-series", tvSeriesRoute);

module.exports = route;
