export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// export type Gender = "female" | "male";
export enum Gender {
  Female = "female",
  Male = "male",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NewPatient = Omit<Patient, "id">;
