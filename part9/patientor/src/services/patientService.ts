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

export default { getAll };
