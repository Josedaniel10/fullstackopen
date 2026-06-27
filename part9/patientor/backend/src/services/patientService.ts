import type {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from "../types";
import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";

const getPatients = (): PatientEntry[] => {
  return patientsData;
};

const getPatient = (id: string): PatientEntry => {
  const patient = patientsData.find((patient) => patient.id === id);

  if (!patient) throw new Error("Patient not found");

  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const createPatient = (patient: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatient: PatientEntry = {
    id,
    ...patient,
  };

  patientsData.push(newPatient);
  return newPatient;
};

const createEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const id = uuid();
  const newEntry: Entry = {
    id,
    ...entry
  };

  const index: number = patientsData.findIndex(patient => patient.id === patientId);
  patientsData[index].entries.push(newEntry);

  return newEntry;
};

export default {
  createPatient,
  getPatients,
  getNonSensitiveEntries,
  getPatient,
  createEntry
};
