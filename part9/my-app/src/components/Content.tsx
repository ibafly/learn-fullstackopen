import React from "react";

interface Course {
name:string
exerciseCount:number
}

const Content=({entries}:{entries:Course[]})=> <div>{entries.map(entry=> <p key={entry.name}>{entry.name} {entry.exerciseCount}</p>)}</div>


export default Content