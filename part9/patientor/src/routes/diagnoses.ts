import express from "express";
import diagnoseService from "../services/diagnoseService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.status(200).send(diagnoseService.getAll());
});

export default diagnosesRouter;
