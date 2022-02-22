import React from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import { Divider, Segment, Grid, Button } from "semantic-ui-react";

import {
  Option,
  SelectField,
  NumberField,
  TextField,
  DiagnosisSelection,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { NewEntry } from "../types";
import { isDate } from "../utils";

interface Props {
  error: string | undefined
  onSubmit: (values: NewEntry) => void
  // onCancel: () => void
}
const entryTypeOptions: Option[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

const AdditionalFields = () => { // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values }: any = useFormikContext();

  switch (values.type) {
    case "HealthCheck":
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3} // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validate={(value:any) => {
            let error;
            if (!value) {
              error = "Required";
            }
            return error;
          }}
        />
      );
    case "Hospital":
      return (
        <div>
          <Divider horizontal>Discharge</Divider>
          <Field
            label="Date"
            name="discharge.date"
            component={TextField} // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validate={(value:any) => {
              let error;
              if (!value) {
                error = "Required";
              }
              if (!isDate(value)) {
                error = "Malformatted";
              }
              return error;
            }}
          />
          <Field
            label="Criteria"
            name="discharge.criteria"
            component={TextField} // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validate={(value:any) => {
              let error;
              if (!value) {
                error = "Required";
              }
              return error;
            }}
          />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Field
            label="Employer Name"
            Placeholder="Employer"
            name="employerName"
            component={TextField} // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validate={(value:any) => {
              let error;
              if (!value) {
                error = "Required";
              }
              return error;
            }}
          />
          <Divider horizontal>Sick Leave</Divider>
          <Field
            label="Start Date"
            Placeholder=""
            name="sickLeave.startDate"
            component={TextField} // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validate={(value:any) => {
              let error;
              if (value && !isDate(value)) {
                error = "Malformatted";
              }
              return error;
            }}
          />
          <Field
            label="End Date"
            Placeholder=""
            name="sickLeave.endDate"
            component={TextField} // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validate={(value:any) => {
              let error;
              if (value && !isDate(value)) {
                error = "Malformatted";
              }
              return error;
            }}
          />
        </>
      );
    default:
      return null;
  }
};
const AddEntryForm = ({ error, onSubmit }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined,
        healthCheckRating: 3,
        // discharge: {
        //   date: "",
        //   criteria: "",
        // },
        // employerName: "",
        // sickLeave: {
        //   startDate: undefined,
        //   endDate: undefined,
        // },
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const malformattedError = "Field is malformatted";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.name = requiredError;
        }
        if (!values.specialist) {
          errors.ssn = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isDate(values.date)) {
          errors.date = malformattedError;
        }
        // switch (values.type) {
        //   case "HealthCheck":
        //     if (!values.healthCheckRating) {
        //       errors.healthCheckRating = requiredError;
        //     }
        //     break;
        //   case "Hospital":
        //     if (!values.discharge.date) {
        //       errors.dischargeDate = requiredError
        //     }
        //     if (!isDate(values.discharge.date)) {
        //       errors.dischargeDate = malformattedError
        //     }
        //     if (!values.discharge.criteria) {
        //       errors.dischargeCriteria = requiredError
        //     }
        //     break
        //   case "OccupationalHealthcare":
        //     if (!values.employerName) {
        //       errors.employerName = requiredError
        //     }
        //     if (
        //       values.sickLeave?.startDate &&
        //       !isDate(values.sickLeave.startDate)
        //     ) {
        //       errors.sickLeaveStartDate = malformattedError
        //     }
        //     if (
        //       values.sickLeave?.endDate &&
        //       !isDate(values.sickLeave.endDate)
        //     ) {
        //       errors.sickLeaveEndDate = malformattedError
        //     }
        //     break
        //   default:
        //     break
        // }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            {error && (
              <Segment inverted color="red">{`Error: ${JSON.stringify(
                error
              )}`}</Segment>
            )}
            <SelectField label="Type" name="type" options={entryTypeOptions} />
            <Field
              label="Description"
              Placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              Placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              Placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <AdditionalFields />
            <Grid>
              <Grid.Column floated="left" width={5}>
                {/* <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button> */}
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
