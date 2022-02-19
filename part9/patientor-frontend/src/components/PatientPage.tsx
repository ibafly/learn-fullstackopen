import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";

import { Icon } from "semantic-ui-react";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  console.log("patients from state: ", patients);
  const patient = patients[id];
  console.log("after patient declaration: ", patient);

  useEffect(async () => {
    console.log("enter useEffect");

    if (patient && !patient.entries) {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );

      console.log("in if in useEffect, before dispatch");
      dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
      console.log("in if in useEffect, after dispatch ", patients);
    }
  }, [patients]);

  const genderDict = new Map([
    ["female", "venus"],
    ["male", "mars"],
    ["other", "genderless"],
  ]);

  if (!patient) {
    return "loading";
  }
  return (
    <div>
      <h2>
        {patient.name}
        <Icon name={genderDict.get(patient.gender)} />
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
