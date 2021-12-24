// The router is in fact a middleware, that can be used for defining "related routes" in a single place, that is typically placed in its own module.
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

// blogsRouter.get("/", (request, response) => {
//   // notice that /api/blogs becomes /
//   Blog.find({}).then(blogs => {
//     response.json(blogs)
//   })
// })

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("userId", "username name") // Blog.find({}) returns a Promise while await Blog.find({}) returns the result when find operation fullfilled // "username name" can be written as {username:1, name:1}
  console.log(blogs)
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

  const user = await User.findById(body.userId)
  // console.log(body.userId, user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    content: body.content,
    likes: body.likes || 0,
    userId: user._id,
  })

  const savedBlog = await blog.save()
  user.blogIds = user.blogIds.concat(savedBlog._id)
  await user.save({ validateBeforeSave: false })

  res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  const result = await Blog.findByIdAndDelete(id)
  if (result) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id
  const result = await Blog.findByIdAndUpdate(id, req.body, { new: true }) // option new for pass updated result instead of the founded one
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(400).end()
  }
})

module.exports = blogsRouter
