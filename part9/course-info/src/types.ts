// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CoursePartVerbose extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartVerbose {
  type: "normal";
  // description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}
interface CourseSubmissionPart extends CoursePartVerbose {
  type: "submission";
  // description: string;
  exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CoursePartVerbose {
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
