const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, validate } = require('../models/rental');
const express = require('express')
const router = express.Router();


router.get('/', async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error, value } = validate(req.body)
  if (error) {
    res.send("request invalid");
    return;
  }
  const customer = await Customer.findById(value.customerId);
  if (!customer) return res.send("Invalid Customer");
  const movie = await Movie.findById(value.movieId);
  if (!movie) return res.send("Invlaid Movie")
  const rental = await Rental({
    customer,
    movie,
  });
  res.send(rental);
})

module.exports = router;