import { v1 as uuid } from "uuid";
import patientData from "../../data/patients.json";
import { Patient } from "../types";

const patients: Patient[] = patientData;

const getAll = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    // Because TypeScript doesn't modify the actual data but only its type, we need to exclude the fields ourselves
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNew = (patient: Omit<Patient, "id">): Omit<Patient, "ssn"> => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);

  const { ssn, ...nonSensitivePatient } = newPatient;
  return nonSensitivePatient;
};

export default { getAll, addNew };
