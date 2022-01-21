const express =require('express')
const router = express.Router();
const Employee = require("../models/employees");
const config = require('../config/database');



router.get("/test", async (req, res) => {
  const customer = await Employee.find();
  res.json(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json(customer);
});

router.post("/test", async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
});

router.put("/:id", async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
  res.json({
    message: "ok",
  });
});

router.delete("/remove", async (req, res) => {
  await Customer.deleteMany();
  res.json({
    message: "ok",
  });
});

router.delete("/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({
    message: "ok",
  });
});

module.exports = router;
