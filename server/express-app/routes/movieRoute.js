const route = require("express").Router();
const MovieController = require("../controllers/movieController");

route.get("/", MovieController.findMovie);
route.post("/", MovieController.addMovie);
route.put("/:id", MovieController.updatedMovie);
route.delete("/:id", MovieController.removeMovie);

module.exports = route;
