"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mercurius_1 = require("mercurius");
const master_common_enum_1 = require("../../../interfaces/master.common.enum");
const admin_schema_1 = require("../schema/admin.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const master_common_helper_1 = require("../../../interfaces/master.common.helper");
const auth_1 = require("../../../utils/auth");
const instructor_schema_1 = require("../../instructor/schema/instructor.schema");
const lectures_schema_1 = require("../../lectures/schema/lectures.schema");
const course_schema_1 = require("../../course/schema/course.schema");
class AdminService {
    async me(ctx) {
        try {
            const admin = await admin_schema_1.AdminModel.findOne({ _id: ctx?.user }).lean();
            return admin;
        }
        catch (error) {
            console.log(error.message.toString());
            throw new mercurius_1.ErrorWithProps("Something went wrong.");
        }
    }
    async addAdmin(input, ctx) {
        try {
            if (ctx?.role !== master_common_enum_1.AdminRole.admin) {
                throw new mercurius_1.ErrorWithProps("You are not authorized to add admin");
            }
            if (!input?.email ||
                !input?.password ||
                !input?.name ||
                !input?.phone ||
                !input?.role) {
                throw new mercurius_1.ErrorWithProps("Invalid input");
            }
            if (input?.phone.length !== 10) {
                throw new mercurius_1.ErrorWithProps("Invalid phone number");
            }
            const user = await admin_schema_1.AdminModel.countDocuments({ email: input?.email });
            if (user > 0) {
                throw new mercurius_1.ErrorWithProps("User already exists");
            }
            const admin = await admin_schema_1.AdminModel.create({
                email: input.email,
                phone: input?.phone,
                password: input.password,
                name: input.name,
                role: input.role,
                createdBy: ctx?.user,
                createdAt: new Date(),
            });
            await instructor_schema_1.InstructorModel.create({
                admin: admin?._id.toString(),
            });
            return true;
        }
        catch (error) {
            console.log(error.message.toString());
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async loginAdmin(email, password, context) {
        try {
            if (context?.user) {
                throw new mercurius_1.ErrorWithProps("Already logged In.");
            }
            // get user
            const user = await admin_schema_1.AdminModel.findOne({ email: email })
                .select("_id role password devices")
                .lean();
            if (!user) {
                throw new mercurius_1.ErrorWithProps("User not exists!");
            }
            // compare password
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new mercurius_1.ErrorWithProps("Invalid email or password!");
            }
            // Log device details
            const req = context.req;
            const userAgent = req.headers["user-agent"];
            const device = (0, master_common_helper_1.parseUserAgent)(userAgent);
            await admin_schema_1.AdminModel.updateOne({
                email: email,
            }, {
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
            });
            // create jwt
            const token = (0, auth_1.signJwt)({
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
                    domain: `.choosepos.com`,
                    path: "/",
                });
            }
            else {
                context.rep.setCookie("accessToken", token, {
                    maxAge: 3.154e10,
                    httpOnly: true,
                });
            }
            return token;
        }
        catch (error) {
            // console.log(error.message.toString());
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async logoutAdmin(context) {
        if (process.env.NODE_ENV === "production") {
            context.rep.cookie("accessToken", "", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                domain: `.choosepos.com`,
                path: "/",
                expires: new Date(0),
            });
        }
        else {
            context.rep.cookie("accessToken", "", {
                maxAge: 3.154e10,
                httpOnly: true,
                expires: new Date(0),
            });
        }
        await admin_schema_1.AdminModel.updateOne({
            _id: context?.user,
        }, {
            $set: {
                lastLoggedOut: new Date(),
            },
        });
        return true;
    }
    async getAllInstructors() {
        try {
            const instructors = await instructor_schema_1.InstructorModel.find()
                .populate("admin", "_id name email phone role createdAt updatedAt numberOfResetPassword")
                .exec();
            return instructors;
        }
        catch (error) { }
    }
    async getAllLectures() {
        try {
            const lectures = await lectures_schema_1.LectureModel.find({}).lean();
            return lectures;
        }
        catch (error) {
            console.log(error.message.toString);
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async getAllCourses() {
        try {
            const courses = await course_schema_1.CourseModel.find({}).lean();
            return courses;
        }
        catch (error) {
            console.log(error.message.toString);
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
    async resetPassword(id, password, ctx) {
        try {
            if (!id || !password) {
                throw new mercurius_1.ErrorWithProps("Invalid input");
            }
            if (ctx?.role !== master_common_enum_1.AdminRole.admin) {
                throw new mercurius_1.ErrorWithProps("You are not authorized to reset password.");
            }
            const admin = await admin_schema_1.AdminModel.countDocuments({ _id: id }).lean();
            if (admin === 0) {
                throw new mercurius_1.ErrorWithProps("Admin not found.");
            }
            const salt = await bcrypt_1.default.genSalt(10);
            const hash = bcrypt_1.default.hashSync(password, salt);
            await admin_schema_1.AdminModel.findOneAndUpdate({
                _id: id,
            }, {
                $set: {
                    password: hash,
                    updatedAt: new Date(),
                },
                $inc: {
                    numberOfResetPassword: 1,
                },
            });
            return true;
        }
        catch (error) {
            throw new mercurius_1.ErrorWithProps(error.message.toString());
        }
    }
}
exports.default = AdminService;
