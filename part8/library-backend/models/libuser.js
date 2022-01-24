const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  favoriteGenre: {
    type: String,
  },
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model("Libuser", schema)
