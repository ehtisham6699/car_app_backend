const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  color: {
    type: String,
  },
  model: {
    type: Number,
  },
  make: {
    type: String,
  },
  registerationNo: {
    type: String,
  },
  category: { type: Schema.Types.ObjectId, ref: "category" },
  owner: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("car", carSchema);
