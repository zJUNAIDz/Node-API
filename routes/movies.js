const express = require("express");
const router = express.Router();

const { Movie, validate } = require("../models/Movie");
const { Genre } = require("../models/Genre");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (err) {
    res.status(404).send("no movies found");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
  } catch (err) {
    res.status(404).send("No such movie with given id");
  }
});

router.post("/", async (req, res) => {
  // try {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(value);
  const genre = await Genre.findById(value.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");
  const movie = new Movie({
    ...value,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
  });
  const result = await movie.save();
  res.send(result);
  // } catch (err) {
  // res.status(503).send("something went wrong...");
  // }
});




module.exports = router;
