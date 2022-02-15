import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.status(200).send(patientService.getAll());
});

patientsRouter.post("/", (req, res): any => {
  // const body=req.body
  //   const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const newPatient = toNewPatient(req.body);

  //   if (!name && dateOfBirth && gender && occupation && ssn) {
  //     return res.status(400).send({ error: "parameters missing" });
  //   }

  const nonSensitivePatient = patientService.addNew(newPatient);
  //   const newPatient = patientService.addNew({
  //     name,
  //     dateOfBirth,
  //     gender,
  //     occupation,
  //     ssn,
  //   });

  res.status(201).send(nonSensitivePatient);
});

export default patientsRouter;
