import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, NewEntry } from "../types";
import { useStateValue, updatePatient, addEntry } from "../state";

import { Card, Icon, SemanticICONS } from "semantic-ui-react";

const PatientPage = () => {
  const [error, setError] = useState<string | undefined>();
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

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

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry)); // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");

      setTimeout(() => {
        setError(undefined);
      }, 5000);
    }
  };
  const genderDict: Map<string, SemanticICONS> = new Map([
    ["female", "venus"],
    ["male", "mars"],
    ["other", "genderless"],
  ]);

  if (!patient) {
    return <div>loading...</div>;
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
      <AddEntryForm error={error} onSubmit={submitNewEntry} />

      <Card.Group>
        {patient.entries &&
          patient.entries.map((entry: Entry) => {
            return <EntryDetails key={entry.id} entry={entry} />;
          })}
      </Card.Group>
    </div>
  );
};

export default PatientPage;
