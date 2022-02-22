import { NewEntry, NewPatient, Gender } from "./types";

/* type guard */
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date)); // If the value is omitted or is 0, -0, null, false, NaN, undefined, or the empty string (""), the object has an initial value of false. All other values, including any object, an empty array ([]), or the string "false" or new Boolean(false) constructed object, create an object with an initial value of true.
};
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

//--- type guard for type NewEntry
const isInt = (value: any): value is number => {
  return Number.isInteger(value);
};
const isIntInRange = (int: number, min: number, max: number): boolean => {
  return Array.from(Array(max - min + 1).keys(), (n) => n + min).includes(int);
  // OR use spread syntax instead of Array.from, .map instead of callback fn. eg: const range = [...Array(end - start + 1).keys()].map(x => x + start);
};
// const isArray = (value: any): value is Array<any> => {
//   return Array.isArray(value);
// };
const isStringArray = (value: any): value is Array<string> => {
  return Array.isArray(value) && !value.find((item) => !isString(item));
};

/* safe parsing */
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date " + date);
  }
  return date;
};
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};
//--- paring for type NewEntry
const parseText = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing text");
  }
  return text;
};
const parseHealthCheckRating = (rating: unknown): number => {
  if (!rating || !isInt(rating) || !isIntInRange(rating, 0, 3)) {
    throw new Error("Incorrect or missing rating");
  }
  return rating;
};
const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes || !isStringArray(codes)) {
    throw new Error("Incorrect diagnosis code(s)");
  }
  return codes;
};

const toNewPatient = (obj: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
  };

  return newPatient;
};

const toNewEntry = (obj: any): NewEntry => {
  let newEntry: NewEntry;
  const baseEntry = {
    // type: parseType(obj.type),
    description: parseText(obj.description),
    date: parseDate(obj.date),
    specialist: parseName(obj.specialist),
    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
  };
  obj.diagnosisCodes ? (baseEntry.diagnosisCodes = obj.diagnosisCodes) : null;
  switch (obj.type) {
    case "HealthCheck":
      newEntry = {
        type: "HealthCheck",
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      };
      break;
    case "Hospital":
      newEntry = {
        type: "Hospital",
        ...baseEntry,
        discharge: {
          date: parseDate(obj.discharge.date),
          criteria: parseText(obj.discharge.criteria),
        },
      };
      break;
    case "OccupationalHealthcare":
      newEntry = {
        type: "OccupationalHealthcare",
        ...baseEntry,
        employerName: parseName(obj.employerName),
        // sickLeave: {
        //   startDate: parseDate(obj.sickLeave.startDate),
        //   endDate: parseDate(obj.sickLeave.endDate),
        // },
      };
      obj.sickLeave
        ? (newEntry.sickLeave = {
            startDate: parseDate(obj.sickLeave.startDate),
            endDate: parseDate(obj.sickLeave.endDate),
          })
        : null;
      break;
    default:
      throw new Error("invalid entry type");
  }
  return newEntry;
};

export { toNewPatient, toNewEntry };
