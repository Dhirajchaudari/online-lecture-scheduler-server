"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mercurius_1 = require("mercurius");
const master_common_enum_1 = require("../../../interfaces/master.common.enum");
const course_schema_1 = require("../schema/course.schema");
const instructor_schema_1 = require("../../instructor/schema/instructor.schema");
const lectures_schema_1 = require("../../lectures/schema/lectures.schema");
class CourseService {
    async addCourse(input, ctx) {
        try {
            if (ctx?.role !== master_common_enum_1.AdminRole.admin) {
                throw new mercurius_1.ErrorWithProps("You are not authorized to add course");
            }
            if (!input?.name ||
                !input?.desc ||
                !input?.price ||
                input?.price < 0) {
                throw new mercurius_1.ErrorWithProps("Invalid input");
            }
            await course_schema_1.CourseModel.create({
                admin: ctx?.user,
                name: input.name,
                desc: input.desc,
                price: input.price,
                createdBy: ctx?.user,
                updatedBy: ctx?.user,
                duration: input?.duration,
                image: input.image,
                level: input.level,
            });
            return true;
        }
        catch (error) {
            console.log(error.message.toString());
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async updateCourse(input, ctx) {
        try {
            if (!input?.id) {
                throw new mercurius_1.ErrorWithProps("Invalid Id");
            }
            const course = await course_schema_1.CourseModel.findOne({
                _id: input?.id,
            })
                .lean();
            if (!course) {
                throw new mercurius_1.ErrorWithProps("Course not found");
            }
            await course_schema_1.CourseModel.updateOne({ _id: input.id }, {
                $set: {
                    ...input,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error.message.toString());
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async deleteCourse(id, ctx) {
        try {
            if (ctx?.role !== master_common_enum_1.AdminRole.admin) {
                throw new mercurius_1.ErrorWithProps("You are not authorized to delete course");
            }
            if (!id) {
                throw new mercurius_1.ErrorWithProps("Invalid Id");
            }
            const course = await course_schema_1.CourseModel.countDocuments({ _id: id });
            if (course === 0) {
                throw new mercurius_1.ErrorWithProps("Course not found");
            }
            // remove the course from instructor
            await instructor_schema_1.InstructorModel.updateMany({
                "courses._id": id,
            }, {
                $pull: {
                    courses: {
                        _id: id,
                    },
                },
            });
            // remove the course lecture
            await lectures_schema_1.LectureModel.updateMany({
                course: id,
            }, {
                $pull: {
                    course: {
                        _id: id,
                    },
                },
            });
            // delete the course
            await course_schema_1.CourseModel.deleteOne({ _id: id });
            return true;
        }
        catch (error) {
            console.log(error.message.toString());
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
}
exports.default = CourseService;
