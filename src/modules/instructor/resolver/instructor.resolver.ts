import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import InstructorService from "../service/instructor.service";
import Context from "../../../utils/context";
import { isAdmin, isAuth } from "../../../middlewares/auth";

@Resolver()
export class InstructorResolver {
  constructor(private instructorService: InstructorService) {
    this.instructorService = new InstructorService();
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  removeCourseFromInstructor(
    @Arg("instructorId") instructorId: string,
    @Arg("courseId") courseId: string,
    @Ctx() ctx: Context
  ) {
    return this.instructorService.removeCourseFromInstructor(
      instructorId,
      courseId,
      ctx
    );
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  deleteInstructor(@Arg("id") id: string, @Ctx() ctx: Context) {
    return this.instructorService.deleteInstructor(id, ctx);
  }
}
