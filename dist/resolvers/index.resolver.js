"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const admin_resolver_1 = require("../modules/admin/resolver/admin.resolver");
const course_resolver_1 = require("../modules/course/resolver/course.resolver");
const instructor_resolver_1 = require("../modules/instructor/resolver/instructor.resolver");
const lectures_resolver_1 = require("../modules/lectures/resolver/lectures.resolver");
exports.resolvers = [
    admin_resolver_1.AdminResolver,
    instructor_resolver_1.InstructorResolver,
    course_resolver_1.CourseResolver,
    lectures_resolver_1.LectureResolver
];
