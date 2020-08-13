const db = require("../config/config");
const TvSeries = db.collection("tvSeries");
const { ObjectId } = require("mongodb");

class TvSeriesModel {
  static find() {
    return TvSeries.find().toArray();
  }
  static create(newTvSeries) {
    return TvSeries.insertOne(newTvSeries);
  }
  static update(id, updatedTvSeries) {
    return TvSeries.updateOne(
      { _id: ObjectId(id) },
      {
        $set: updatedTvSeries,
      }
    );
  }
  static delete(id) {
    return TvSeries.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = TvSeriesModel;
