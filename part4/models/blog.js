const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model("Blog", blogSchema)

const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL)

module.exports = Blog
