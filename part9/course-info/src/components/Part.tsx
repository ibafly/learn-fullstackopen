import React from "react"

import { CoursePart } from "../types"

interface mockCoursePart {
  name: string
  exerciseCount: number
  type: string
  description?: string
  groupProjectCount?: number
  exerciseSubmissionLink?: string
  requirements?: string[]
}

const Part = (props: CoursePart) => {
  // return <div> {Object.values(props).map((value)=> <p>{value}</p> )} </div>

  const {
    name,
    exerciseCount,
    description,
    type,
    exerciseSubmissionLink,
    groupProjectCount,
  } = props as mockCoursePart

  return (
    <div>
      <p>Name: {name}</p>
      <p>Exercise Count: {exerciseCount}</p>
      {description && <p>Description: {description}</p>}
      {type && <p>Type: {type}</p>}
      {exerciseSubmissionLink && (
        <p>Link to Submit: {exerciseSubmissionLink}</p>
      )}
      {groupProjectCount && <p>Group Project Count: {groupProjectCount}</p>}
    </div>
  )
}

export default Part
