export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

// export type Gender = "female" | "male";
export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
}
interface BaseEntry {
  id: string;
  type: string;
  // type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  // type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  // type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  // type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  gender: string;
  occupation: string;
  dateOfBirth?: string;
  ssn?: string;
  test?: "Test";
  // entries?: Entry[];
  entries?: Array<Entry>;
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, "id">;

export type NewPatient = Omit<Patient, "id">;

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
