const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const journalistSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    picture: { type: String, required: false },
    bio: {type: String, required: false}
  },
  { timestamps: true }
);
const Journalist = mongoose.model("journalist", journalistSchema);

module.exports = Journalist;