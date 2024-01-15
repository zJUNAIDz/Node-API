const mongoose = require('mongoose');
const Joi = require('joi');


//*NOTE: Creating schema with apparantly same properties and not reusing existing is because:
//*What if we got lots of properties in our original movie and customer schema ? are we gonna use it all for jut renting it out? 
//* No! real inefficient... so here we using separate schema for validation as per our specific need of information. 


const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 12,
  }
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
  }
})

const RentalSchema = new mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true,
  },
  movie: {
    type: movieSchema,
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  }

})
const Rental = mongoose.model("Rental", RentalSchema);
const validate = (rental) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  });
  return schema.validate(rental);
}
exports.Rental = Rental;
exports.validate = validate;