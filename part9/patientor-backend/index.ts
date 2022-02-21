import express from "express";
import cors from "cors";
import diagnosesRouter from "./src/routes/diagnoses";
import patientsRouter from "./src/routes/patients";

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnosis", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
