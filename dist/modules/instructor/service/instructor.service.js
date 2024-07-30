"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mercurius_1 = require("mercurius");
const instructor_schema_1 = require("../schema/instructor.schema");
const course_schema_1 = require("../../course/schema/course.schema");
const master_common_enum_1 = require("../../../interfaces/master.common.enum");
const lectures_schema_1 = require("../../lectures/schema/lectures.schema");
const admin_schema_1 = require("../../admin/schema/admin.schema");
class InstructorService {
    async removeCourseFromInstructor(instructorId, courseId, ctx) {
        try {
            if (ctx?.role !== master_common_enum_1.AdminRole.admin) {
                throw new mercurius_1.ErrorWithProps("You are not authorized to remove course from instructor");
            }
            if (!instructorId || !courseId) {
                throw new mercurius_1.ErrorWithProps("Invalid ID.");
            }
            const instructor = await instructor_schema_1.InstructorModel.countDocuments({
                _id: instructorId,
            });
            if (instructor === 0) {
                throw new mercurius_1.ErrorWithProps("Instructor not found.");
            }
            const course = await course_schema_1.CourseModel.countDocuments({ _id: courseId });
            if (course === 0) {
                throw new mercurius_1.ErrorWithProps("Course not found.");
            }
            await course_schema_1.CourseModel.updateOne({
                _id: courseId,
            }, {
                $set: {
                    admin: ctx?.user,
                },
            });
            await instructor_schema_1.InstructorModel.updateOne({
                _id: instructorId,
            }, {
                $pull: {
                    courses: {
                        _id: courseId,
                    },
                },
            });
            return true;
        }
        catch (error) {
            console.log(error.message.toString());
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async deleteInstructor(id, ctx) {
        try {
            if (!id) {
                throw new mercurius_1.ErrorWithProps("Invalid ID.");
            }
            const instructor = await instructor_schema_1.InstructorModel.countDocuments({ admin: id });
            if (instructor === 0) {
                throw new mercurius_1.ErrorWithProps("Instructor not found.");
            }
            await course_schema_1.CourseModel.updateMany({
                admin: id,
            }, {
                $set: {
                    admin: ctx?.user,
                },
            });
            await lectures_schema_1.LectureModel.updateMany({
                createdBy: id,
            }, {
                $set: {
                    createdBy: ctx?.user,
                },
            });
            await lectures_schema_1.LectureModel.updateMany({
                updatedBy: id,
            }, {
                $set: {
                    updatedBy: ctx?.user,
                },
            });
            await instructor_schema_1.InstructorModel.deleteOne({
                admin: id,
            });
            await admin_schema_1.AdminModel.deleteOne({ _id: id });
            return true;
        }
        catch (error) {
            console.log(error.message.toString());
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
}
exports.default = InstructorService;
