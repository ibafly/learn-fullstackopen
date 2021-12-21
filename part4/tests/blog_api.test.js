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

describe("initial blogs", () => {
  test("are returned as JSON && there are 6 blogs initially && id property is named 'id'", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(res.body).toHaveLength(6)

    for (blogObj of res.body) {
      expect(blogObj.id).toBeDefined()
    }
  }, 100000) // Jest default test timeout is 5000ms
})

describe("addition of a new blog", () => {
  test("succeeds with valid data", async () => {
    const res = await api
      .post("/api/blogs")
      .send(helper.aNewBlogWithContent)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    console.log(res.body, blogsAtEnd)
    expect(res.body.content).toBe(helper.aNewBlogWithContent.content)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
