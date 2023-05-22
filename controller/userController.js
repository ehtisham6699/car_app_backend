const express = require("express");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

exports.login = async function (req, res) {
  try {
    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    //Compare the password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.KEY
    );

    res.cookie("jwt", token);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchAll = async function (req, res) {
  User.find({}).exec(function (err, user) {
    if (err) throw err;
    res.send(user);
  });
};
exports.register = async function (req, res) {
  try {
    const password = generateRandomPassword();

    const hashedPassword = await bcrypt.hash(password, 10);
    await sendEmail(req.body.email, password);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.send("User Registered");
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
const sendEmail = async (email, password) => {
  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  password = password;
  mailOptions = {
    from: process.env.EMAIL,
    to: `${email}`,
    subject: "Login Password for Car App",
    text: `Your password for login is: ${password}`,
  };
  smtpTransport.sendMail(mailOptions, function (error, res) {
    if (error) {
      console.log(error);
      return res.send("error");
    } else {
      console.log("Message sent: ");
    }
  });
};

const generateRandomPassword = () => {
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
};
