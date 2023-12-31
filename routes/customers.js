//* GET POST PUT DELETE
//* initial setup
const express = require("express");
const Customer = require("../models/customer").Customer;
const validate = require("../models/customer").validateCustomer;

const router = express.Router();

/**
 * @returns list of existing Customers in DB
 */
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  if (!customers) {
    res.status(404).send("No customer yet");
    return;
  }
  res.send(customers);
});

/**
 * @param ObjectId
 * @returns JSON object of cusotomer with given Id
 */
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404).send("Customer with given Id doesn't exist");
    return;
  }
  res.send(customer);
});

/**
 * @returns JSON object of newly added customer
 */
router.post("/", async (req, res) => {
  const data = req.body;
  const { error } = validate(data);
  if (error) {
    res.status(500).send(error.details[0].message);
    return;
  }
  const customer = new Customer(data);
  customer.save(); //* no await needed as we're not storing and using it somewhere
  res.send(customer);
});

/**
 * @param ObjectId
 * @returns Updated JSON object
 */
router.put("/:id", async (req, res) => {
  const prevCustomer = await Customer.findById(req.params.id);
  const { isGold, name, phone } = {
    isGold: req.body.isGold || prevCustomer.isGold,
    name: req.body.name || prevCustomer.name,
    phone: req.body.phone || prevCustomer.phone,
  };
  if (!prevCustomer) {
    res.status(404).send("Customer with given Id doesn't exist");
    return;
  }
  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    isGold,
    name,
    phone,
  });

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    res.status(404).send("Customer with given Id doesn't exist");
    return;
  }

  res.send(customer);
});

module.exports = router;
