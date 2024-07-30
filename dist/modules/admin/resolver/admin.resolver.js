"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminResolver = void 0;
const type_graphql_1 = require("type-graphql");
const admin_input_1 = require("../interface/admin.input");
const admin_service_1 = __importDefault(require("../service/admin.service"));
const admin_schema_1 = require("../schema/admin.schema");
const auth_1 = require("../../../middlewares/auth");
const instructor_schema_1 = require("../../instructor/schema/instructor.schema");
const course_schema_1 = require("../../course/schema/course.schema");
const lectures_schema_1 = require("../../lectures/schema/lectures.schema");
let AdminResolver = class AdminResolver {
    constructor(adminService) {
        this.adminService = adminService;
        this.adminService = new admin_service_1.default();
    }
    me(ctx) {
        return this.adminService.me(ctx);
    }
    addAdmin(input, ctx) {
        return this.adminService.addAdmin(input, ctx);
    }
    adminLogin(email, password, context) {
        return this.adminService.loginAdmin(email, password, context);
    }
    adminLogout(context) {
        return this.adminService.logoutAdmin(context);
    }
    getAllInstructors() {
        return this.adminService.getAllInstructors();
    }
    getAllCourses() {
        return this.adminService.getAllCourses();
    }
    getAllLectures() {
        return this.adminService.getAllLectures();
    }
    resetPasswordAdmin(id, pass, ctx) {
        return this.adminService.resetPassword(id, pass, ctx);
    }
};
exports.AdminResolver = AdminResolver;
__decorate([
    (0, type_graphql_1.Query)(() => admin_schema_1.Admin),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_input_1.AddAdminInput, Object]),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "addAdmin", null);
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "adminLogin", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "adminLogout", null);
__decorate([
    (0, type_graphql_1.Query)(() => [instructor_schema_1.Instructor]),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "getAllInstructors", null);
__decorate([
    (0, type_graphql_1.Query)(() => [course_schema_1.Course]),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "getAllCourses", null);
__decorate([
    (0, type_graphql_1.Query)(() => [lectures_schema_1.Lecture]),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "getAllLectures", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "resetPasswordAdmin", null);
exports.AdminResolver = AdminResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [admin_service_1.default])
], AdminResolver);
