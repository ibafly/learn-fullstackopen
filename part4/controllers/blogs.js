// The router is in fact a middleware, that can be used for defining "related routes" in a single place, that is typically placed in its own module.
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (request, response) => {
  // notice that /api/blogs becomes /
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter
