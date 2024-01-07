const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");
const schema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    default: 0,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    default: 0,
  },
});

const Movie = mongoose.model("Movie", schema);

const validate = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(1),
    dailyRentalRate: Joi.number().min(0),
  });
  return schema.validate(movie);
};

exports.Movie = Movie;
exports.validate = validate;
