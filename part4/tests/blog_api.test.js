const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")

const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 100000)

test("blogs are returned as JSON && there are 6 blogs initially && id property is named 'id'", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(res.body).toHaveLength(6)

  for (blogObj of res.body) {
    expect(blogObj.id).toBeDefined()
  }
}, 100000) // Jest default test timeout is 5000ms

afterAll(() => {
  mongoose.connection.close()
})
