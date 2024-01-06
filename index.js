const mongoose = require("mongoose");

const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const express = require("express");
const app = express();
mongoose
  .connect("mongodb://localhost:27017/anime")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Failed to connect to MongoDB :("));

app.use(express.json());
app.set("view engine", "pug");
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
