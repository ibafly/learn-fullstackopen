import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Diagnosis, Patient } from "../types";
import { useStateValue, updatePatient } from "../state";

import { Icon, SemanticICONS } from "semantic-ui-react";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients ,diagnosis}, dispatch] = useStateValue();

  console.log("patients from state: ", patients);
  const patient = patients[id];
  console.log("after patient declaration: ", patient);

  useEffect(() => {
    console.log("enter useEffect");

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        console.log("in if in useEffect, before dispatch");
        //   dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
        dispatch(updatePatient(patientFromApi));
        console.log("in if in useEffect, after dispatch ", patients);
      } catch (e) {
        console.error(e);
      }
    };

    if (patient && !patient.entries) {
      void fetchPatient();
    }
  }, [patients]);

  const genderDict:Map<string,SemanticICONS> = new Map([
    ["female", "venus"],
    ["male", "mars"],
    ["other", "genderless"],
  ]);

  if (!patient) {
    return <div>loading</div>;
  }
  return (
    <div>
      <h2>
        {patient.name}
        <Icon name={genderDict.get(patient.gender)} />
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries:</h3>

        {patient.entries&&patient.entries.map(entry=>{
            return (
                <div key={entry.id}>
                  <p>{entry.date} <em>{entry.description}</em>   </p>
                    {entry.diagnosisCodes && 
                    <ul>{entry.diagnosisCodes.map(code=> <li key={code}>{code} {diagnosis[code].name}</li> )}</ul>}
                </div>
            );
        })}
    </div>
  );
};

export default PatientPage;