import express from "express";
import patientService from "../services/patientService";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.status(200).send(patientService.getAll());
});

patientsRouter.post("/", (req, res): any => {
  // const body=req.body
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;

  if (!name && dateOfBirth && gender && occupation && ssn) {
    return res.status(400).send({ error: "parameters missing" });
  }

  const newPatient = patientService.addNew({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  });

  res.status(201).send(newPatient);
});

export default patientsRouter;
