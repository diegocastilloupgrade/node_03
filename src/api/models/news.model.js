const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: false },
    date: { type: Number, required: true },
    picture: { type: String, required: false },
    content:{ type: String, required: true}
  },
  { timestamps: true }
);
const News = mongoose.model("news", NewsSchema);

module.exports = News;

