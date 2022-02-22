import express from "express";
import patientService from "../services/patientService";
import { toNewPatient, toNewEntry } from "../utils";

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

patientsRouter.get("/:id", (req, res): any => {
  const { id } = req.params;
  const foundPatient = patientService.getOneBy(id);

  if (!foundPatient) {
    return res.status(404);
  }

  console.log("get one patient: ", foundPatient);

  res.status(200).send(foundPatient);
});

patientsRouter.post("/:id/entries", (req, res) => {
  const patientId = req.params.id;
  const newEntry = toNewEntry(req.body);

  const addedEntry = patientService.addNewEntry(patientId, newEntry);

  res.status(201).send(addedEntry);
});

export default patientsRouter;
