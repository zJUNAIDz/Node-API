const Joi = require("joi");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
  },
});

const Customer = mongoose.model("Customer", schema);

const validate = (customer) => {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(1).trim().required(),
    phone: Joi.string().required(),
  });
  return schema.validate(customer);
};

exports.Customer = Customer;
exports.validate = validate;
