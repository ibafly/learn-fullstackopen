const usersRouter = require("express").Router()
const Users = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.get("/", async (req, res) => {
  const users = await Users.find({})
  res.status(200).send(users)
})

usersRouter.post("/", async (req, res) => {
  const body = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const fromUserInfo = {
    username: body.username,
    name: body.name,
    passwordHash,
  }

  const newUser = new Users(fromUserInfo)
  newUser.save()
  res.status(201).send(newUser)
})
module.exports = usersRouter
