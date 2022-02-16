import React from "react";

interface Course {
name:string
exerciseCount:number
}

const Total=({entries}:{entries:Course[]})=> (<p>Number of exercises{" "} {entries.reduce((carry, part) => carry + part.exerciseCount, 0)} </p>)


export default Total