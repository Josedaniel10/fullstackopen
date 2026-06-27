import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toNewEntry } from "../../utils";
const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

patientsRouter.get("/:id", (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.createPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.post('/:id/entries', (req, res)=> {
  const patientId = req.params.id;
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.createEntry(newEntry, patientId);
    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
