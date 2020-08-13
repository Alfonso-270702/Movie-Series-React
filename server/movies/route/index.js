const route = require("express").Router();
const MovieController = require("../controller/movie");

route.get("/movies", MovieController.findMovie);
route.post("/movies", MovieController.addMovie);
route.put("/movies/:id", MovieController.updatedMovie);
route.delete("/movies/:id", MovieController.removeMovie);

module.exports = route;
