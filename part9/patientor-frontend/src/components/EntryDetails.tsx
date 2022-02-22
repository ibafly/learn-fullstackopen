import React from "react";
import {HealthCheckEntry,HospitalEntry,OccupationalHealthcareEntry, Entry} from "../types";
import { assertNever } from "../utils";
import { useStateValue } from "../state";

import { Card, Icon } from "semantic-ui-react";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

const HospitalEntryComp = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <p>
            {entry.date}
            <Icon name="hospital" />
          </p>
        </Card.Header>
        <Card.Description>
          <p> {entry.description} </p>
        </Card.Description>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code: string) => (
              <li key={code}>
                {code} {diagnoses[code].name}
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
    </Card>
  );
};
const HealthCheckEntryComp: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  const ratingDict: Map<number, SemanticCOLORS> = new Map([
    [0, "green"],
    [1, "yellow"],
    [2, "orange"],
    [3, "red"],
  ]);
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <p>
            {entry.date}
            <Icon name="user md" />
          </p>
        </Card.Header>
        <Card.Description>
          <p> {entry.description} </p>
        </Card.Description>
        {/* {entry.healthCheckRating && ( */}
          <Icon name="heart" color={ratingDict.get(entry.healthCheckRating)} />
        {/* )} */}
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code: string) => (
              <li key={code}>
                {code} {diagnoses[code].name}
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
    </Card>
  );
};
const OccupationalHealthcareEntryComp = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <p>
            {entry.date}
            <Icon name="stethoscope" />
            {entry.employerName}
          </p>
        </Card.Header>
        <Card.Description>
          <p> {entry.description} </p>
        </Card.Description>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code: string) => (
              <li key={code}>
                {code} {diagnoses[code].name}
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
    </Card>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryComp entry={entry} />;
    case "Hospital":
      return <HospitalEntryComp entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComp entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
