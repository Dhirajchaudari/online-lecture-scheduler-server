import { ErrorWithProps } from "mercurius";
import Context from "../../../utils/context";
import {
  AddLectureInput,
  UpdateLectureInput,
} from "../interfaces/lecture.input";
import { AdminRole, StatusEnum } from "../../../interfaces/master.common.enum";
import { LectureModel } from "../schema/lectures.schema";
import { CourseModel } from "../../course/schema/course.schema";

class LectureService {
  async addLecture(input: AddLectureInput, ctx: Context) {
    try {
      if (!input?.name || !input?.desc || !input?.end || !input?.start) {
        throw new ErrorWithProps("Invalid input");
      }

      if (input?.status === StatusEnum.active && !input?.videoLink) {
        throw new ErrorWithProps("You must select a video.");
      }

      //  start time and end time cannot be same
      if (input?.start === input?.end) {
        throw new ErrorWithProps("Start time and end time cannot be same");
      }

      //  start time and end time cannot be in past
      if (new Date(input?.start) < new Date()) {
        throw new ErrorWithProps("Start time cannot be in past");
      }

      //  start time and end time cannot be in future
      if (new Date(input?.end) < new Date()) {
        throw new ErrorWithProps("End time cannot be in future");
      }

      if (new Date(input?.start) > new Date(input?.end)) {
        throw new ErrorWithProps("Start time cannot be after end time");
      }

      await LectureModel.create({
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
    } catch (error) {
      console.log(error.message.toString);
      throw new ErrorWithProps(error.message.toString());
    }
  }

  async updateLecture(input: UpdateLectureInput, ctx: Context) {
    try {
      if (!input?.id) {
        throw new ErrorWithProps("Invalid Id");
      }

      const lecture = await LectureModel.findOne({
        _id: input?.id,
      })
        .select("_id start end")
        .lean();

      if (!lecture) {
        throw new ErrorWithProps("Lecture not found");
      }

      if (input?.start || input?.end) {
        //  start time and end time cannot be same
        if ((input?.start || lecture?.start) === (input?.end || lecture?.end)) {
          throw new ErrorWithProps("Start time and end time cannot be same");
        }

        //  start time and end time cannot be in past
        if (new Date(input?.start || lecture?.start) < new Date()) {
          throw new ErrorWithProps("Start time cannot be in past");
        }

        //  start time and end time cannot be in future
        if (new Date(input?.end || lecture?.end) < new Date()) {
          throw new ErrorWithProps("End time cannot be in future");
        }

        if (
          new Date(input?.start || lecture?.start) >
          new Date(input?.end || lecture?.end)
        ) {
          throw new ErrorWithProps("Start time cannot be after end time");
        }
      }

      await LectureModel.updateOne(
        {
          _id: input?.id,
        },
        {
          $set: {
            ...input,
            updatedBy: ctx?.user,
          },
        }
      );

      return true;
    } catch (error) {
      console.log(error.message.toString);
      throw new ErrorWithProps(error.message.toString());
    }
  }

  async getLecturesByInstructor(ctx: Context) {
    try {
      const lectures = await LectureModel.find({
        createdBy: ctx?.user,
      });

      if ((lectures ?? []).length === 0) {
        return [];
      }
      return lectures;
    } catch (error) {
      console.log(error.message.toString);
      throw new ErrorWithProps(error.message.toString());
    }
  }

  async deleteLecture(id: String, ctx: Context) {
    try {
      if (!id) {
        throw new ErrorWithProps("Invalid Id");
      }

      const lecture = await LectureModel.countDocuments({ _id: id }).lean();
      if (lecture === 0) {
        throw new ErrorWithProps("Lecture not found");
      }

      // check lecture is associated with course or not
      const lectureCourse = await CourseModel.countDocuments({
        "lectures._id": id,
      });
      if (lectureCourse > 0 && ctx?.role === AdminRole.instructor) {
        throw new ErrorWithProps(
          "Cannot delete lecture associated with a course"
        );
      }

      await CourseModel.updateOne(
        {
          "lectures._id": id,
        },
        {
          $pull: {
            lectures: {
              _id: id,
            },
          },
        }
      );

      await LectureModel.deleteOne({
        _id: id,
      });

      return true;
    } catch (error) {
      console.log(error.message.toString());
      throw new ErrorWithProps(error.message.toString());
    }
  }

  async addLectureToCourse(courseId: string, lectureId: string, ctx: Context) {
    try {
      if (ctx?.role === AdminRole.instructor) {
        throw new ErrorWithProps(
          "You are not authorized to add lecture to course"
        );
      }
      if (!courseId || !lectureId) {
        throw new ErrorWithProps("Invalid input");
      }

      const course = await CourseModel.countDocuments({ _id: courseId }).lean();
      if (course === 0) {
        throw new ErrorWithProps("Course not found");
      }

      const lecture = await LectureModel.findOne({ _id: lectureId })
        .select("_id name status start end")
        .lean();
      if (!lecture) {
        throw new ErrorWithProps("Lecture not found");
      }

      // check course is already added to course or not
      const lectureCount = await CourseModel.countDocuments({
        "lectures._id": lectureId,
      });

      if (lectureCount > 0) {
        throw new ErrorWithProps("Lecture already added to course");
      }

      await CourseModel.updateOne(
        {
          _id: courseId,
        },
        {
          $push: {
            lectures: {
              ...lecture,
              id: lecture?._id.toString(),
            },
          },
        }
      );

      return true;
    } catch (error) {
      console.log(error.message.toString());
      throw new ErrorWithProps(error.message.toString());
    }
  }
}

export default LectureService;
