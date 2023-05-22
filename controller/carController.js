const express = require("express");
const Car = require("../models/carSchema");

exports.createCar = async function (req, res) {
  try {
    const { make, model, color, registerationNo, category } = req.body;

    if (!make || !model || !color || !registerationNo || !category) {
      return res.status(400).send("All fields are required");
    }
    if (isNaN(model)) {
      return res.status(400).send("Model must be a number");
    }
    const car = new Car({
      make,
      model,
      color,
      registerationNo,
      category,
      owner: req.user.id,
    });

    await car.save();
    await car.populate("category", "CategoryName");
    res.send({ car, message: "Car Registered" });
  } catch (error) {
    console.error("Error creating Car:", error);
    res.status(500).send("Error creating Car");
  }
};

exports.editCar = async function (req, res) {
  try {
    const { make, model, color, registerationNo, category, _id } = req.body;

    if (!make || !model || !color || !registerationNo || !category) {
      return res.status(400).send("All fields are required");
    }
    if (isNaN(model)) {
      return res.status(400).send("Model must be a number");
    }
    const updatedCar = await Car.findByIdAndUpdate(
      { _id: req.params._id },
      {
        make,
        model,
        color,
        registerationNo,
        category,
        owner: req.user.id,
      }
    );
    res.send(updatedCar);
  } catch (error) {
    console.error("Error creating Car:", error);
  }
};
exports.deleteCar = async function (req, res) {
  try {
    let d = await Car.findByIdAndDelete(req.params._id);
    res.status(200).send(d);
  } catch (error) {
    return error;
  }
};
exports.getAllCars = async function (req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const cars = await Car.find()
      .populate("category", "CategoryName")
      .skip(skip)
      .limit(limit);
    const totalCars = await Car.countDocuments();
    const totalPages = Math.ceil(totalCars / limit);

    res.json({ cars, totalPages, totalRows: totalCars });
  } catch (error) {
    console.error("Error retrieving cars:", error);
    res.status(500).send("Error retrieving cars");
  }
};
