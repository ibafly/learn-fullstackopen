import { v1 as uuid } from "uuid";
import patientData from "../../data/patients.json";
import { PublicPatient, NewPatient, Patient } from "../types";

let patients: Patient[] = patientData;
patients = patients.map((patient) => ({ ...patient, entries: [] }));

const getAll = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    // Because TypeScript doesn't modify the actual data but only its type, we need to exclude the fields ourselves
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

// const addNew = (patient: Omit<Patient, "id">): Omit<Patient, "ssn"> => {
const addNew = (patient: NewPatient): PublicPatient => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);

  const { ssn, ...nonSensitivePatient } = newPatient;
  return nonSensitivePatient;
};

const getOneBy = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default { getAll, addNew, getOneBy };
