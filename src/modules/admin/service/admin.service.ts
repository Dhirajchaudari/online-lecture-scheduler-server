import { ErrorWithProps } from "mercurius";
import { AddAdminInput } from "../interface/admin.input";
import Context from "../../../utils/context";
import { AdminRole } from "../../../interfaces/master.common.enum";
import { Admin, AdminModel } from "../schema/admin.schema";
import bcrypt from "bcrypt";
import { FastifyRequest } from "fastify";
import { parseUserAgent } from "../../../interfaces/master.common.helper";
import { signJwt } from "../../../utils/auth";
import { InstructorModel } from "../../instructor/schema/instructor.schema";
import { LectureModel } from "../../lectures/schema/lectures.schema";
import { CourseModel } from "../../course/schema/course.schema";

class AdminService {
  async me(ctx: Context): Promise<Admin> {
    try {
      const admin = await AdminModel.findOne({ _id: ctx?.user }).lean();
      return admin;
    } catch (error: any) {
      console.log(error.message.toString());
      throw new ErrorWithProps("Something went wrong.");
    }
  }

  async addAdmin(input: AddAdminInput, ctx: Context) {
    try {
      if (ctx?.role !== AdminRole.admin) {
        throw new ErrorWithProps("You are not authorized to add admin");
      }

      if (
        !input?.email ||
        !input?.password ||
        !input?.name ||
        !input?.phone ||
        !input?.role
      ) {
        throw new ErrorWithProps("Invalid input");
      }

      if (input?.phone.length !== 10) {
        throw new ErrorWithProps("Invalid phone number");
      }

      const user = await AdminModel.countDocuments({ email: input?.email });

      if (user > 0) {
        throw new ErrorWithProps("User already exists");
      }

      const admin = await AdminModel.create({
        email: input.email,
        phone: input?.phone,
        password: input.password,
        name: input.name,
        role: input.role,
        createdBy: ctx?.user,
        createdAt: new Date(),
      });

      await InstructorModel.create({
        admin: admin?._id.toString(),
      });

      return true;
    } catch (error: any) {
      console.log(error.message.toString());
      throw new ErrorWithProps(error.message.toString());
    }
  }

  async loginAdmin(email: string, password: string, context: Context) {
    try {
      if (context?.user) {
        throw new ErrorWithProps("Already logged In.");
      }

      // get user
      const user = await AdminModel.findOne({ email: email })
        .select("_id role password devices")
        .lean();

      if (!user) {
        throw new ErrorWithProps("User not exists!");
      }

      // compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new ErrorWithProps("Invalid email or password!");
      }

      // Log device details
      const req = context.req as FastifyRequest;
      const userAgent = req.headers["user-agent"];

      const device = parseUserAgent(userAgent);

      await AdminModel.updateOne(
        {
          email: email,
        },
        {
          $set: {
            lastLoggedIn: new Date(),
          },
          $push: {
            accessHistory: {
              createdAt: new Date(),
              device: {
                type: device.deviceType,
                deviceName: device.browserName,
                deviceOS: device.deviceOS,
              },
            },
          },
        }
      );

      // create jwt
      const token = signJwt({
        role: user.role,
        user: user._id,
      });

      // create cookie
      if (process.env.NODE_ENV === "production") {
        context.rep.setCookie("accessToken", token, {
          maxAge: 3.154e10,
          httpOnly: true,
          sameSite: "none",
          secure: true,
          domain: `https://online-lecture-scheduler-client.vercel.app/`,
          path: "/",
        });
      } else {
        context.rep.setCookie("accessToken", token, {
          maxAge: 3.154e10,
          httpOnly: true,
        });
      }
      return token;
    } catch (error) {
      // console.log(error.message.toString());
      throw new ErrorWithProps(error.message.toString());
    }
  }

  async logoutAdmin(context: Context) {
    if (process.env.NODE_ENV === "production") {
      context.rep.cookie("accessToken", "", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: `.vercel.app`,
        path: "/",
        expires: new Date(0),
      });
    } else {
      context.rep.cookie("accessToken", "", {
        maxAge: 3.154e10,
        httpOnly: true,
        expires: new Date(0),
      });
    }

    await AdminModel.updateOne(
      {
        _id: context?.user,
      },
      {
        $set: {
          lastLoggedOut: new Date(),
        },
      }
    );

    return true;
  }

  async getAllInstructors() {
    try {
      const instructors = await InstructorModel.find()
        .populate(
          "admin",
          "_id name email phone role createdAt updatedAt numberOfResetPassword"
        )
        .exec();
      return instructors;
    } catch (error) {}
  }

  async getAllLectures() {
    try {
      const lectures = await LectureModel.find({}).lean();
      return lectures;
    } catch (error) {
      console.log(error.message.toString);
      throw new ErrorWithProps(error.message.toString());
    }
  }

  async getAllCourses() {
    try {
      const courses = await CourseModel.find({}).lean();
      return courses;
    } catch (error) {
      console.log(error.message.toString);
      throw new ErrorWithProps(error.message.toString());
    }
  }

  async resetPassword(id: string, password: string, ctx: Context) {
    try {
      if (!id || !password) {
        throw new ErrorWithProps("Invalid input");
      }

      if (ctx?.role !== AdminRole.admin) {
        throw new ErrorWithProps("You are not authorized to reset password.");
      }

      const admin = await AdminModel.countDocuments({ _id: id }).lean();

      if (admin === 0) {
        throw new ErrorWithProps("Admin not found.");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = bcrypt.hashSync(password, salt);

      await AdminModel.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            password: hash,
            updatedAt: new Date(),
          },
          $inc: {
            numberOfResetPassword: 1,
          },
        }
      );


      return true;
    } catch (error) {
      throw new ErrorWithProps(error.message.toString());
    }
  }
}

export default AdminService;
