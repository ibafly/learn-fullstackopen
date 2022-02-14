import express from "express";
import patientService from "../services/patientService";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  console.log(patientService.getAll());

  res.status(200).send(patientService.getAll());
});

export default patientsRouter;
