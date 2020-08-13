const db = require("../config/config");
const Movie = db.collection("movies");
const { ObjectId } = require("mongodb");

class MovieModel {
  static find() {
    return Movie.find().toArray();
  }
  static create(newMovie) {
    return Movie.insertOne(newMovie);
  }
  static update(id, updatedMovie) {
    return Movie.updateOne(
      { _id: ObjectId(id) },
      {
        $set: updatedMovie,
      }
    );
  }
  static deleteMovie(id) {
    return Movie.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = MovieModel;
