// The router is in fact a middleware, that can be used for defining "related routes" in a single place, that is typically placed in its own module.
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

// blogsRouter.get("/", (request, response) => {
//   // notice that /api/blogs becomes /
//   Blog.find({}).then(blogs => {
//     response.json(blogs)
//   })
// })

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}) // Blog.find({}) returns a Promise while await Blog.find({}) returns the result when find operation fullfilled
  //console.dir(blogs) // will show partial properties of an object
  //console.log(
  //  Object.getOwnPropertyNames(Blog),
  //  "===",
  //  Object.getOwnPropertyNames(Blog.prototype) // includes $__remove method
  //)
  res.json(blogs)
})

blogsRouter.post("/", async (req, res) => {
  const body = req.body

  if (!body.title && !body.url) {
    return res.status(400).send({ error: "title and url are missing" })
  }

  const initialized = {
    title: body.title,
    author: body.author,
    url: body.url,
    content: body.content,
    likes: body.likes || 0,
  }
  const blog = new Blog(initialized)

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogsRouter
