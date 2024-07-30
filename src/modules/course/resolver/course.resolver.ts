import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import CourseService from "../service/course.service";
import { isAdmin, isAuth } from "../../../middlewares/auth";
import Context from "../../../utils/context";
import { AddCourseInput, UpdateCourseInput } from "../interfaces/course.input";

@Resolver()
export class CourseResolver {
  constructor(private courseServicer: CourseService) {
    this.courseServicer = new CourseService();
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  addCourse(@Arg("input") input: AddCourseInput, @Ctx() ctx: Context) {
    return this.courseServicer.addCourse(input, ctx);
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  updateCourse(@Arg("input") input: UpdateCourseInput, @Ctx() ctx: Context) {
    return this.courseServicer.updateCourse(input, ctx);
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  deleteCourse(@Arg("id") id:string, @Ctx() ctx: Context) {
    return this.courseServicer.deleteCourse(id, ctx);
  }
}
