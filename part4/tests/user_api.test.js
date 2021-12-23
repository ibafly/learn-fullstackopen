const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")

const User = require("../models/user")

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    await User.insertMany(helper.initialOneRootUser)
  }, 100000)

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserInfo = {
      username: "cat",
      name: "Cat",
      password: "meowmeow",
    }

    const res = await api.post("/api/users").send(newUserInfo).expect(201)

    const usersAtEnd = await helper.usersInDb()
    const usernames = usersAtEnd.map(user => user.username)

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usernames).toContain(newUserInfo.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
