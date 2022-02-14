// const express = require("express")
import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
const app = express();

const PORT = 3002;

app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res): any => {
  const { height, weight } = req.query;

  if (!height || !weight || !Number(height) || !Number(weight)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  res.send({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post("/exercises", (req, res): any => {
  const body = req.body;
  // const { daily_exercises, target } = body;

  // if (!Number(target)) {
  //   res.status(400).send({ error: "no" });
  // }

  try {
    // const daily_exercises: Array<number> = body.daily_exercises;
    // const target: number = body.target;
    const { daily_exercises, target } = body;

    if (!daily_exercises || !target) {
      return res.status(400).send({ error: "parameters missing" });
    }

    const result = calculateExercises(daily_exercises, target);

    res.status(200).send(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server runnnig on port ${PORT}`);
});
