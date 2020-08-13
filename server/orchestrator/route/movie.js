const route = require("express").Router();
const MovieOrchestrator = require("../controllers/movie");

route.get("/", MovieOrchestrator.getMovie);
route.post("/", MovieOrchestrator.addMovie);
route.put("/:id", MovieOrchestrator.editMovie);
route.delete("/:id", MovieOrchestrator.deleteMovie);

module.exports = route;
