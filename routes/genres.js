const express = require("express");
const router = express.Router();
// const genres = require("../data/genres");
const { Genre, validate } = require("../models/Genre");

//* GET all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

//*GET specific genre
router.get("/:id", async (req, res) => {
  //* simply find by id and return it if it exist
  //NOTE: here, id refers to ObjectId: _id
  const genre = await Genre.findById(+req.params.id);
  res.send(genre);
  console.log(genre);
  // const genre = genres.find((genre) => genre.id === +req.params.id); //*Its for working with array
  if (!genre) {
    res.status(404).send("Genre with provided key not found");
    return;
  }
  res.send(genre);
  // const genree = await Genre.findOne({ id: +req.params.id });
  // const genree2 = await Genre.findById("658d79823069d6f0cb9c1843");
  // res.send([genree, genree2]);
});

//*ADD a genre
router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .send("'name', 'description' and 'description' field is required");
    return;
  }
  // const genre = {
  //   id: genres.length + 1,
  //   name: req.body.name,
  //   description: req.body.description,
  // };

  let genre = new Genre({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
  });

  // genres.push(genre);
  genre = await genre.save(); //* to avoid making other variable
  res.send(genre);
});

// //*UPDATE a genre works with Arrays
// router.put("/:id", (req, res) => {
//   if (!req.body.name || !req.body.description) {
//     res.status(400).send("Both 'name' and 'description' are required");
//     return;
//   }
//   const index = genres.findIndex((genre) => genre.id === +req.params.id);
//   if (index === -1) {
//     res.status(404).send("Genre with given ID not found!");
//     return;
//   }
//   genres[index] = {
//     ...genres[index],
//     name: req.body.name,
//     description: req.body.description,
//   };
//   res.send(genres[index]);
// });

//*Update name of Genre
router.put("/:id", async (req, res) => {
  //* validate Genre request
  // const schema = Joi.object({
  //   name: Joi.string().trim().min(1).required(),
  // });
  // const { error, value } = schema.validate(req.body);
  const { error } = validateGenre(req.body);
  // console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  //* Find by id and try to update it
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) {
    res.send("Genre with given Id doesn't Exist");
    return;
  }
  res.send(genre);
});

//*DELETE a genre
router.delete("/:id", async (req, res) => {
  //* Delete from DB if it exist and return deleted genre
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    res.status(404).send("Genre with given id doesn't exist");
    return;
  }
  // const index = genres.findIndex((genre) => genre.id === +req.params.id);
  // if (index === -1) {
  //   res.status(404).send("Genre with provided ID doesn't exist");
  //   return;
  // }

  // const genre = genres[index];
  // genres.splice(index, 1);

  res.send(genre);
});

module.exports = router;
