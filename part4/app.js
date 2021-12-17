const config = require("./utils/config")
const logger = require("./utils/logger")
const express = require("express")
const blogsRouter = require("./controllers/blogs")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

logger.info("connecting to ", config.MONGO_URL)

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch(err => {
    logger.error("error connecting to MongDB", err.message)
  })

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)

module.exports = app
