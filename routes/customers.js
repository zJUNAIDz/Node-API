//* GET POST PUT DELETE
//* initial setup
const express = require("express");
const { Customer, validate } = require("../models/customer");

const router = express.Router();

/**
 * @returns list of existing Customers in DB
 */
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort("name");
    res.send(customers);
  } catch (err) {
    res.status(404).send("No customer yet");
    return;
  }
});

/**
 * @param ObjectId
 * @returns JSON object of cusotomer with given Id
 */
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (err) {
    res.status(404).send("Customer with given Id doesn't exist");
    return;
  }
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
  try {
    const prevCustomer = await Customer.findById(req.params.id);
    const { isGold, name, phone } = {
      isGold: req.body.isGold || prevCustomer.isGold,
      name: req.body.name || prevCustomer.name,
      phone: req.body.phone || prevCustomer.phone,
    };
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
      isGold,
      name,
      phone,
    });

    res.send(customer);
  } catch (err) {
    res.status(404).send("Customer with given Id doesn't exist");
  }
});
/**
 * @param ObjectId
 * @returns JSON object of deleted customer
 */
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    res.send(customer);
  } catch (err) {
    res.status(404).send("Customer with given Id doesn't exist");
  }
});

module.exports = router;
