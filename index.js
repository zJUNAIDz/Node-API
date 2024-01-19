const mongoose = require("mongoose");

const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals")
const express = require("express");
const app = express();
mongoose
  .connect("mongodb://localhost:27017/anime")
  .then(() => console.log("Connected to MongoDB..."))
  
  .catch((err) => console.error("Failed to connect to MongoDB :(", err));

app.set("view engine", "pug");
app.use(express.json());
app.use("/v1", home);
app.use("/v1/api/genres", genres);
app.use("/v1/api/customers", customers);
app.use("/v1/api/movies", movies);
app.use("/v1/api/rentals", rentals);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
