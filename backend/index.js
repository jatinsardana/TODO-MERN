import express from "express";
const app = express();
app.use(express.json());
import cors from "cors";
app.use(cors());

import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/practice", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const userSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: String,
});
const User = mongoose.model("User", userSchema);

// create
app.post("/createtodo", async (req, res) => {
  const { title, description, tags } = req.body;
  const newUser = await User.create({
    title,
    description,
    tags,
  });
  res.status(201).json({
    msg: "user created",
    newUser,
  });
});

// update
app.put("/updatetodo/:id", async (req, res) => {
  const { title, description } = req.body;
  try {
    const user =await User.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });
    res.status(200).send("Task updated successfully");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// delete
app.delete("/deletetodo/:id", async (req, res) => {
  try {
    const user =await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Task deleted successfully");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// get
app.get("/getall", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({
      msg: "All users",
      allUsers,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).send("Internal server error");
  }
});


app.listen(3000, () => {
  console.log("app is listening");
});
