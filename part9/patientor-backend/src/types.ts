export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// export type Gender = "female" | "male";
export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}

export interface Entry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
}
export interface Patient {
  id: string;
  name: string;
  gender: string;
  occupation: string;
  dateOfBirth?: string;
  ssn?: string;
  entries?: Entry[];
}

export type NewPatient = Omit<Patient, "id">;

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
