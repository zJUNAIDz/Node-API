const Joi = require("joi");
const mongoose = require("mongoose");

const schema = mongoose.schema({
  isGold: Boolean,
  name: String,
  phone: String,
});

const Customer = mongoose.model("Customer", schema);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(1).trim().required(),
    phone: Joi.string().required(),
  });
  return schema.validate(customer);
};

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
