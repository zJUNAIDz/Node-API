const Joi = require("joi");
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // id: { type: Number, required: true },
  name: String,
  // description: String,
});

const Genre = mongoose.model("Genre", schema);

function validate(genre) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
  });

  return schema.validate(genre);
}
module.exports.genreSchema = schema;
module.exports.Genre = Genre;
module.exports.validate = validate;
// export default mongoose.model("Genre", schema);
