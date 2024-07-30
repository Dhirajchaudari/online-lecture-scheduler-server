import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import LectureService from "../services/lectures.services";
import { isAdmin, isAuth } from "../../../middlewares/auth";
import { AddLectureInput, UpdateLectureInput } from "../interfaces/lecture.input";
import Context from "../../../utils/context";
import { Lecture } from "../schema/lectures.schema";


@Resolver()
export class LectureResolver {
  constructor(private lectureService: LectureService) {
    this.lectureService = new LectureService();
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  addLecture(@Arg("input") input: AddLectureInput, @Ctx() ctx: Context) {
    return this.lectureService.addLecture(input, ctx);
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  updateLecture(@Arg("input") input: UpdateLectureInput,@Ctx() ctx: Context) {
    return this.lectureService.updateLecture(input, ctx);
  }

  @Query(() => [Lecture],{nullable:true,defaultValue:[]})
  @UseMiddleware([isAuth, isAdmin])
  getLecturesByInstructor(@Ctx() ctx: Context): Promise<Lecture[]> {
    return this.lectureService.getLecturesByInstructor(ctx);
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  deleteLecture(@Arg("id") id: String, @Ctx() ctx: Context) {
    return this.lectureService.deleteLecture(id, ctx);
  }

  @Mutation(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  addLectureToCourse(
    @Arg("courseId") courseId: string,
    @Arg("lectureId") lectureId: string,
    @Ctx() ctx: Context
  ) {
    return this.lectureService.addLectureToCourse(courseId, lectureId, ctx);
  }
}