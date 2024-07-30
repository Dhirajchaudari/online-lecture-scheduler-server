import { ErrorWithProps } from "mercurius";
import { InstructorModel } from "../schema/instructor.schema";
import { CourseModel } from "../../course/schema/course.schema";
import Context from "../../../utils/context";
import { AdminRole } from "../../../interfaces/master.common.enum";
import { LectureModel } from "../../lectures/schema/lectures.schema";
import { AdminModel } from "../../admin/schema/admin.schema";

class InstructorService {
  async removeCourseFromInstructor(
    instructorId: String,
    courseId: string,
    ctx: Context
  ) {
    try {
      if (ctx?.role !== AdminRole.admin) {
        throw new ErrorWithProps(
          "You are not authorized to remove course from instructor"
        );
      }

      if (!instructorId || !courseId) {
        throw new ErrorWithProps("Invalid ID.");
      }

      const instructor = await InstructorModel.countDocuments({
        _id: instructorId,
      });
      if (instructor === 0) {
        throw new ErrorWithProps("Instructor not found.");
      }

      const course = await CourseModel.countDocuments({ _id: courseId });
      if (course === 0) {
        throw new ErrorWithProps("Course not found.");
      }

      await CourseModel.updateOne(
        {
          _id: courseId,
        },
        {
          $set: {
            admin: ctx?.user,
          },
        }
      );

      await InstructorModel.updateOne(
        {
          _id: instructorId,
        },
        {
          $pull: {
            courses: {
              _id: courseId,
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

  async deleteInstructor(id: string, ctx: Context) {
    try {
      if (!id) {
        throw new ErrorWithProps("Invalid ID.");
      }

      const instructor = await InstructorModel.countDocuments({ admin: id });
      if (instructor === 0) {
        throw new ErrorWithProps("Instructor not found.");
      }

      await CourseModel.updateMany(
        {
          admin: id,
        },
        {
          $set: {
            admin: ctx?.user,
          },
        }
      );

      await LectureModel.updateMany(
        {
          createdBy: id,
        },
        {
          $set: {
            createdBy: ctx?.user,
          },
        }
      );

      await LectureModel.updateMany(
        {
          updatedBy: id,
        },
        {
          $set: {
            updatedBy: ctx?.user,
          },
        }
      );

      await InstructorModel.deleteOne({
        admin: id,
      });

      await AdminModel.deleteOne({_id:id})

      return true;
    } catch (error) {
      console.log(error.message.toString());
      throw new ErrorWithProps(error.message.toString());
    }
  }
}

export default InstructorService;
