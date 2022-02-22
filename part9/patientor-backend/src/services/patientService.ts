import { v1 as uuid } from "uuid";
// import patientData from "../../data/patients.json";
import patientsExtended from "../../data/patientsExtended";
import { PublicPatient, NewPatient, Patient, NewEntry, Entry } from "../types";

// let patients: Patient[] = patientData;
// patients = patients.map((patient) => ({ ...patient, entries: [] }));
let patients: Patient[] = patientsExtended;

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
  console.log("patients in addNew: ", patients);

  const { ssn, ...nonSensitivePatient } = newPatient;
  return nonSensitivePatient;
};

// const getOneBy = (id: string): Patient | undefined => {
//   console.log(patientsExtended);

//   return patientsExtended.find((patient) => patient.id === id);
// };

const getOneBy = (id: string) => {
  // printPatients();
  // const patientsExtended = printPatients();

  return patients.find((patient: any) => patient.id === id);
};

const addNewEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = { id: uuid(), ...entry };

  patients = patients.map((patient) => {
    if (patient.id === id) {
      patient.entries
        ? patient.entries.push(newEntry)
        : (patient.entries = [newEntry]);
    }
    return patient;
  });
  console.log("patients in addNewEntry: ", patients);

  return newEntry;
};

export default { getAll, addNew, getOneBy, addNewEntry };
