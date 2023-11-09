const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/Vinted"); // replace MyCluster

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
app.use(userRoutes);
app.use(offerRoutes);

// Welcome Route
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Welcome on the server 👋" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// All other routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist ⛔" });
});

app.listen(3000, () => {
  console.log("Server started ✅");
});
