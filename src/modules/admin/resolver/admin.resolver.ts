import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { AddAdminInput } from "../interface/admin.input";
import Context from "../../../utils/context";
import AdminService from "../service/admin.service";
import { Admin } from "../schema/admin.schema";
import { isAdmin, isAuth } from "../../../middlewares/auth";
import { Instructor } from "../../instructor/schema/instructor.schema";
import { Course } from "../../course/schema/course.schema";
import { Lecture } from "../../lectures/schema/lectures.schema";

@Resolver()
export class AdminResolver {
  constructor(private adminService: AdminService) {
    this.adminService = new AdminService();
  }

  @Query(() => Admin)
  @UseMiddleware([isAuth, isAdmin])
  me(@Ctx() ctx: Context) {
    return this.adminService.me(ctx);
  }

  @Mutation(() => Boolean)
  addAdmin(@Arg("input") input: AddAdminInput, @Ctx() ctx: Context) {
    return this.adminService.addAdmin(input, ctx);
  }

  @Query(() => String)
  adminLogin(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: Context
  ) {
    return this.adminService.loginAdmin(email, password, context);
  }

  @Query(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  adminLogout(@Ctx() context: Context) {
    return this.adminService.logoutAdmin(context);
  }

  @Query(() => [Instructor])
  @UseMiddleware([isAuth, isAdmin])
  getAllInstructors() {
    return this.adminService.getAllInstructors();
  }

  @Query(() => [Course])
  @UseMiddleware([isAuth, isAdmin])
  getAllCourses() {
    return this.adminService.getAllCourses();
  }

  @Query(() => [Lecture])
  @UseMiddleware([isAuth, isAdmin])
  getAllLectures() {
    return this.adminService.getAllLectures();
  }

  @Query(() => Boolean)
  @UseMiddleware([isAuth, isAdmin])
  resetPasswordAdmin(
    @Arg("id") id: string,
    @Arg("password") pass: string,
    @Ctx() ctx: Context
  ) {
    return this.adminService.resetPassword(id, pass, ctx);
  }
}
