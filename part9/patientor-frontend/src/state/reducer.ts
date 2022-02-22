import { State } from "./state";
import { Entry, Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_MAP";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { patientId: string; entry: Entry };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            // use reduce to transform array to object
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_PATIENT":
      const patientsCopy = { ...state.patients };
      patientsCopy[action.payload.id] = action.payload;
      return {
        ...state,
        patients: {
          ...patientsCopy,
        },
      };
    case "SET_DIAGNOSIS_MAP":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.payload.patientId];
      patient.entries
        ? patient.entries.push(action.payload.entry)
        : (patient.entries = [action.payload.entry]);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: patient,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient,
  };
};

export const setDiagnosisMap = (list: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_MAP",
    payload: list,
  };
};

export const addEntry = (id: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { entry, patientId: id },
  };
};
