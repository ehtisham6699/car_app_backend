const express = require("express");
const Category = require("../models/categorySchema");

exports.createCategory = async function (req, res) {
  try {
    const { CategoryName } = req.body;
    const existingCategory = await Category.findOne({ CategoryName });
    if (existingCategory) {
      return res.status(409).send("Category already exists");
    }
    const cat = await Category.create({ CategoryName });

    res.status(200).send(cat);
  } catch (error) {
    console.error("Error creating Category:", error);
    res.status(500).send("Error creating Category");
  }
};

exports.editCategory = async function (req, res) {
  try {
    const { CategoryName } = req.body;
    const updatedCat = await Category.findByIdAndUpdate(
      req.params._id,
      { CategoryName },
      { new: true }
    );
    if (!updatedCat) {
      return res.status(404).send("Category not found");
    }
    res.status(200).send("Category Edited");
  } catch (error) {
    console.error("Error editing Category:", error);
    res.status(500).send("Error editing Category");
  }
};

exports.deleteCategory = async function (req, res) {
  try {
    let d = await Category.findByIdAndDelete(req.params._id);
    res.send(d);
  } catch (error) {
    console.error("Error deleting Category:", error);
  }
};

exports.getAllCategory = async function (req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    let cat = await Category.find({}).skip(skip).limit(limit);
    const totalCategories = await Category.countDocuments();
    const totalPages = Math.ceil(totalCategories / limit);

    res.json({ cat, totalPages, totalRows: totalCategories });
  } catch (error) {
    console.error("Error fetching Category:", error);
    res.status(500).send("Error retrieving Category");
  }
};
