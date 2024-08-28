const mongoURL = "mongodb://localhost:27017/db";
const PORT = process.env.PORT || 5000;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(mongoURL)

const UserSchema = new mongoose.Schema({
  name: String,
  display: String,
  pass: String,
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  activity: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
});
const User = mongoose.model("collections", UserSchema);


app.get("/get", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// app.post("/register", async (req, res) => {
//   try {
//       const newUser = await User.create(req.body)
//       res.json(newUser)
//   } catch (err) {
//   console.log(err)
//   res.status(500).json(err)
//   }
// });

app.post("/register", async (req, res) => {
  const user = req.body
  try {
    const findUser = await User.findOne({name: user.name})
    if (findUser) {
      res.json("username existed")
    }
    else {
      const newUser = await User.create(req.body)
      res.json(newUser)
    }  
  } catch (err) {
  console.log(err)
  res.status(500).json(err)
  }
});

app.post("/login", async (req, res) => {
  const {name, pass} = req.body
  try {
      const user = await User.findOne({name: name})
      if (!user) {
        res.json("Invalid username")
      }
      else {
        if (user.pass != pass) {
          res.json("Invalid password")
        }
        else {
          res.json(user)
        }
      }
  } catch (err) {
  console.log(err)
  res.status(500).json(err)
  }
});

app.post("/update/profile/info", async (req, res) => {
  const {name, age, gender, height, weight, activity} = req.body
  try{
      const user = await User.findOne({name: name})
      await User.updateOne({name: name}, {$set:{
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        activity: activity
      }})
      res.json(user)
    }
  catch (err) {
  console.log(err)
  res.status(500).json(err)
  }
});

app.post("/update/profile/macro", async (req, res) => {
  const {name, protein, carbs, fat} = req.body
  try{
      const user = await User.findOne({name: name})
      await User.updateOne({name: name}, {$set:{
        protein: protein,
        carbs: carbs,
        fat: fat,
      }})
      res.json(user)
    }
  catch (err) {
  console.log(err)
  res.status(500).json(err)
  }
});

app.post("/update/account/name", async (req, res) => {
  const {name, display} = req.body
  try{
      const user = await User.findOne({name: name})
      await User.updateOne({name: name}, {$set:{
        display: display,
      }})
      res.json(user)
    }
  catch (err) {
  console.log(err)
  res.status(500).json(err)
  }
});

app.post("/update/account/pass", async (req, res) => {
  const {name, oldPass, newPass} = req.body
  try{
      const user = await User.findOne({name: name})
      if (user.pass !== oldPass) {
        res.json("wrong old pass")
        return
      }
      await User.updateOne({name: name}, {$set:{
        pass: newPass,
      }})
      res.json(user)
    }
  catch (err) {
  console.log(err)
  res.status(500).json(err)
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));