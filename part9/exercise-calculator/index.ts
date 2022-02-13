// const express = require("express")
import express from "express";
import calculateBmi from "./bmiCalculator";
const app = express();

const PORT = 3002;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || !Number(height) || !Number(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  res.send({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.listen(PORT, () => {
  console.log(`Server runnnig on port ${PORT}`);
});
