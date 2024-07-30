import { registerEnumType } from "type-graphql";


export enum CourseLevel {
    beginner = "beginner",
    intermediate = "intermediate",
    advanced = "advanced",
    professional = "professional"
}

registerEnumType(CourseLevel, {
  name: "CourseLevel",
  description: "Different level of courses",
});