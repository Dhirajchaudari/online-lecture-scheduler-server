import { AdminResolver } from "../modules/admin/resolver/admin.resolver";
import { CourseResolver } from "../modules/course/resolver/course.resolver";
import { InstructorResolver } from "../modules/instructor/resolver/instructor.resolver";
import { LectureResolver } from "../modules/lectures/resolver/lectures.resolver";

export const resolvers = [
    AdminResolver,
    InstructorResolver,
    CourseResolver,
    LectureResolver
] as const;
