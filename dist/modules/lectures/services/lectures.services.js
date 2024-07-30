"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mercurius_1 = require("mercurius");
const master_common_enum_1 = require("../../../interfaces/master.common.enum");
const lectures_schema_1 = require("../schema/lectures.schema");
const course_schema_1 = require("../../course/schema/course.schema");
class LectureService {
    async addLecture(input, ctx) {
        try {
            if (!input?.name || !input?.desc || !input?.end || !input?.start) {
                throw new mercurius_1.ErrorWithProps("Invalid input");
            }
            if (input?.status === master_common_enum_1.StatusEnum.active && !input?.videoLink) {
                throw new mercurius_1.ErrorWithProps("You must select a video.");
            }
            //  start time and end time cannot be same
            if (input?.start === input?.end) {
                throw new mercurius_1.ErrorWithProps("Start time and end time cannot be same");
            }
            //  start time and end time cannot be in past
            if (new Date(input?.start) < new Date()) {
                throw new mercurius_1.ErrorWithProps("Start time cannot be in past");
            }
            //  start time and end time cannot be in future
            if (new Date(input?.end) < new Date()) {
                throw new mercurius_1.ErrorWithProps("End time cannot be in future");
            }
            if (new Date(input?.start) > new Date(input?.end)) {
                throw new mercurius_1.ErrorWithProps("Start time cannot be after end time");
            }
            await lectures_schema_1.LectureModel.create({
                name: input.name,
                desc: input.desc,
                videoLink: input.videoLink,
                status: input.status,
                duration: input.duration,
                createdBy: ctx?.user,
                updatedBy: ctx?.user,
                start: input?.start,
                end: input?.end,
            });
            return true;
        }
        catch (error) {
            console.log(error.message.toString);
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async updateLecture(input, ctx) {
        try {
            if (!input?.id) {
                throw new mercurius_1.ErrorWithProps("Invalid Id");
            }
            const lecture = await lectures_schema_1.LectureModel.findOne({
                _id: input?.id,
            })
                .select("_id start end")
                .lean();
            if (!lecture) {
                throw new mercurius_1.ErrorWithProps("Lecture not found");
            }
            if (input?.start || input?.end) {
                //  start time and end time cannot be same
                if ((input?.start || lecture?.start) === (input?.end || lecture?.end)) {
                    throw new mercurius_1.ErrorWithProps("Start time and end time cannot be same");
                }
                //  start time and end time cannot be in past
                if (new Date(input?.start || lecture?.start) < new Date()) {
                    throw new mercurius_1.ErrorWithProps("Start time cannot be in past");
                }
                //  start time and end time cannot be in future
                if (new Date(input?.end || lecture?.end) < new Date()) {
                    throw new mercurius_1.ErrorWithProps("End time cannot be in future");
                }
                if (new Date(input?.start || lecture?.start) >
                    new Date(input?.end || lecture?.end)) {
                    throw new mercurius_1.ErrorWithProps("Start time cannot be after end time");
                }
            }
            await lectures_schema_1.LectureModel.updateOne({
                _id: input?.id,
            }, {
                $set: {
                    ...input,
                    updatedBy: ctx?.user,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error.message.toString);
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async getLecturesByInstructor(ctx) {
        try {
            const lectures = await lectures_schema_1.LectureModel.find({
                createdBy: ctx?.user,
            });
            if ((lectures ?? []).length === 0) {
                return [];
            }
            return lectures;
        }
        catch (error) {
            console.log(error.message.toString);
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async deleteLecture(id, ctx) {
        try {
            if (!id) {
                throw new mercurius_1.ErrorWithProps("Invalid Id");
            }
            const lecture = await lectures_schema_1.LectureModel.countDocuments({ _id: id }).lean();
            if (lecture === 0) {
                throw new mercurius_1.ErrorWithProps("Lecture not found");
            }
            // check lecture is associated with course or not
            const lectureCourse = await course_schema_1.CourseModel.countDocuments({
                "lectures._id": id,
            });
            if (lectureCourse > 0 && ctx?.role === master_common_enum_1.AdminRole.instructor) {
                throw new mercurius_1.ErrorWithProps("Cannot delete lecture associated with a course");
            }
            await course_schema_1.CourseModel.updateOne({
                "lectures._id": id,
            }, {
                $pull: {
                    lectures: {
                        _id: id,
                    },
                },
            });
            await lectures_schema_1.LectureModel.deleteOne({
                _id: id,
            });
            return true;
        }
        catch (error) {
            console.log(error.message.toString());
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async addLectureToCourse(courseId, lectureId, ctx) {
        try {
            if (ctx?.role === master_common_enum_1.AdminRole.instructor) {
                throw new mercurius_1.ErrorWithProps("You are not authorized to add lecture to course");
            }
            if (!courseId || !lectureId) {
                throw new mercurius_1.ErrorWithProps("Invalid input");
            }
            const course = await course_schema_1.CourseModel.countDocuments({ _id: courseId }).lean();
            if (course === 0) {
                throw new mercurius_1.ErrorWithProps("Course not found");
            }
            const lecture = await lectures_schema_1.LectureModel.findOne({ _id: lectureId })
                .select("_id name status start end")
                .lean();
            if (!lecture) {
                throw new mercurius_1.ErrorWithProps("Lecture not found");
            }
            // check course is already added to course or not
            const lectureCount = await course_schema_1.CourseModel.countDocuments({
                "lectures._id": lectureId,
            });
            if (lectureCount > 0) {
                throw new mercurius_1.ErrorWithProps("Lecture already added to course");
            }
            await course_schema_1.CourseModel.updateOne({
                _id: courseId,
            }, {
                $push: {
                    lectures: {
                        ...lecture,
                        id: lecture?._id.toString(),
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
}
exports.default = LectureService;
