const { Customer } = require('../models/Customer');
const { Movie } = require('../models/Movie');
const { Rental, validate } = require('../models/Rental');
const mongoose = require('mongoose')
const Fawn = require('fawn')
const express = require('express');
const router = express.Router();
Fawn.init("mongodb://localhost:27017/anime");

router.get('/', async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error, value } = validate(req.body)
  if (error) return res.status(400).send("Invalid request")
  const customer = await Customer.findById(value.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");
  const movie = await Movie.findById(value.movieId);
  if (!movie) return res.status(400).send("Invlaid Movie")
  // const rental = await Rental({
  //   customer, 
  //   movie,
  // });
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    }
  })
  //* THis code is not Intigirity friendly..In fact, there is no such thing as intigrity tho :D
  // const result = rental.save();

  // //* Updating number instock as someone juct got one now  
  // movie.numberInStock--;
  // movie.save();
  // res.send(result);


  //* Intigrity-friendly 
  try {
    new Fawn.Task()
      .save('rentals', rental) //* rentals (case-sensitive) is collection name in mongDB
      .update('movies', { _id: movie._id }, {
        $inc: {
          numberInStock: -1
        }
      })
      .run();
    res.send(rental)
  } catch (err) {
    //* in case if anyone of operation fails
    res.status(500).send("Something went wrong with Intigrity...")
  }


})

module.exports = router;
