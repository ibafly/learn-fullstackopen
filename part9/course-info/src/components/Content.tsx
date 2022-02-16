import React from "react";
import Part from "./Part";

import { CoursePart } from "../types";
import { assertNever } from '../utils';

const Content=({entries}:{entries:CoursePart[]})=> {

entries.forEach(entry=>{
  switch (entry.type) {
    case 'normal':
      break;
    case 'groupProject':
      break;
    case 'submission':
      break;
    case 'special':
      break;
    default:
      return assertNever(entry as never)
  }
})

return <div>{entries.map(entry=> <Part key={entry.name} {...entry} />)}</div>}


export default Content