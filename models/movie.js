const mongoose = require("mongoose");
const validator = require("validator");

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("movie", movieSchema);
