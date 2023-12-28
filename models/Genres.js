const Joi = require("joi");
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: String,
  description: String,
});

const Genre = mongoose.model("Genre", schema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(1).required(),
  };
  return Joi.valid(genre, schema);
}

exports.Genre = Genre;
exports.validateGenre = validateGenre;
// export default mongoose.model("Genre", schema);
