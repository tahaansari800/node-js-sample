require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./src/routes/userRoutes');
const todoRoutes=require('./src/routes/todoRoutes');
const app = express();
// middleware to parse JSON
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api", userRoutes);
app.use("/api",todoRoutes);

//connect to mongoose\

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connection Succeeded.');
  })
  .catch((err) => {
    console.error('Error in DB connection: ', err);
    process.exit(1); // Exit the application if DB connection fails
  });




const PORT = process.env.PORT || 5000
// Basic Route
app.get("/", (req, res) => {
  res.send("Welcome to NODE.js project");
});

//start the server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
