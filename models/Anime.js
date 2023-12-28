const mongoose = require("mongoose");
const schema = new mongoose.schema({
  id: { type: Number, required: true },
  name: { type: String, minlength: 1 },
  genre: [String],
  type: [String],
});

exports.Anime = mongoose.model("Anime", schema);
// export default mongoose.model("Anime", schema);
