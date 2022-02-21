import React from "react";
import { Entry } from "../types";
import { assertNever } from "../utils";
import { useStateValue } from "../state";

import { Card, Icon} from "semantic-ui-react";

const HospitalEntry = ({ entry }: { entry: Entry }) => {
  const [{ diagnosis }] = useStateValue();
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
                {code} {diagnosis[code].name}
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
    </Card>
  );
};
const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();
  const ratingDict: Map<number, string> = new Map([
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
        <Icon name="heart" color={ratingDict.get(entry.healthCheckRating)} />
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code: string) => (
              <li key={code}>
                {code} {diagnosis[code].name}
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
    </Card>
  );
};
const OccupationalHealthcareEntry = ({ entry }: { entry: Entry }) => {
  const [{ diagnosis }] = useStateValue();
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
                {code} {diagnosis[code].name}
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
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
