import React from "react"
import { Formik, Form, Field } from "formik"
import { Grid, Button } from "semantic-ui-react"

import {
    SelectField,
  NumberField,
  TextField,
  DiagnosisSelection,
} from "../AddPatientModal/FormField"
import { useStateValue } from "../state"
import { NewEntry } from "../types"

interface Props {
  onSubmit: (values: NewEntry) => void
  onCancel: () => void
}
const entryTypeOptions=[
    {value:"Hospital",label:"Hospital"},
    {value:"HealthCheck",label:"Health Check"},
    {value:"OccupationalHealthcare",label:"Occupational Healthcare"},
]
const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [{ diagnoses }] = useStateValue()
  console.log('add entry form, diagnoses: ',diagnoses);
  
  return (
    <Formik
      initialValues={{
        type: "",
        description: "",
        date: "",
        specialist: "",
        // diagnosisCodes: [],
        // healthCheckingRate: 3,
      }}
      onSubmit={onSubmit}
      validate=""
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={entryTypeOptions}
            />
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
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
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
        )
      }}
    </Formik>
  )
}

export default AddEntryForm
