const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);


const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  rating: { type: Number, default: 0 },
});
bookSchema.plugin(AutoIncrement, { inc_field: "Id" });

module.exports = mongoose.model("Book", bookSchema);
