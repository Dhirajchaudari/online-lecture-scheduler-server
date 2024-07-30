import { ErrorWithProps } from "mercurius";
import { AddCourseInput, UpdateCourseInput } from "../interfaces/course.input";
import Context from "../../../utils/context";
import { AdminRole } from "../../../interfaces/master.common.enum";
import { CourseModel } from "../schema/course.schema";
import { InstructorModel } from "../../instructor/schema/instructor.schema";
import { LectureModel } from "../../lectures/schema/lectures.schema";

class CourseService {
  async addCourse(input: AddCourseInput, ctx: Context) {
    try {
      if (ctx?.role !== AdminRole.admin) {
        throw new ErrorWithProps("You are not authorized to add course");
      }

      if (
        !input?.name ||
        !input?.desc ||
        !input?.price ||
        input?.price < 0
      ) {
        throw new ErrorWithProps("Invalid input");
      }

      await CourseModel.create({
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
    } catch (error) {
      console.log(error.message.toString());
      throw new ErrorWithProps(error.message.toString());
    }
  }

  async updateCourse(input: UpdateCourseInput, ctx: Context) {
    try {
      if (!input?.id) {
        throw new ErrorWithProps("Invalid Id");
      }

      const course = await CourseModel.findOne({
        _id: input?.id,
      })
        .lean();

      if (!course) {
        throw new ErrorWithProps("Course not found");
      }

      await CourseModel.updateOne(
        { _id: input.id },
        {
          $set: {
            ...input,
          },
        }
      );

      return true;
    } catch (error) {
      console.log(error.message.toString());
      throw new ErrorWithProps(error.message.toString());
    }
  }

  async deleteCourse(id: string, ctx: Context) {
    try {
      if (ctx?.role !== AdminRole.admin) {
        throw new ErrorWithProps("You are not authorized to delete course");
      }
      if (!id) {
        throw new ErrorWithProps("Invalid Id");
      }

      const course = await CourseModel.countDocuments({ _id: id });
      if (course === 0) {
        throw new ErrorWithProps("Course not found");
      }

      // remove the course from instructor
      await InstructorModel.updateMany(
        {
          "courses._id": id,
        },
        {
          $pull: {
            courses: {
              _id: id,
            },
          },
        }
      );

      // remove the course lecture
      await LectureModel.updateMany(
        {
          course: id,
        },
        {
          $pull: {
            course: {
              _id: id,
            },
          },
        }
      );

      // delete the course
      await CourseModel.deleteOne({ _id: id });

      return true;
    } catch (error) {
      console.log(error.message.toString());
      throw new ErrorWithProps(error.message.toString());
    }
    }

}

export default CourseService
