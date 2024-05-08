const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).send("Registration successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    res
      .status(200)
      .send({ status: true, message: "Login successful", token: token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const users = async (req, res) => {
  try {
    const id = req.body.id;
    const user = await User.find({ _id: id });
    if (!user) {
      return res.status(401).send("Invalid User Not Found");
    }

    res
      .status(200)
      .send({ status: true, message: "Data fetched successfully", data: user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { register, login, users };
