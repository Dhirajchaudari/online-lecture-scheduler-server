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
exports.CourseResolver = void 0;
const type_graphql_1 = require("type-graphql");
const course_service_1 = __importDefault(require("../service/course.service"));
const auth_1 = require("../../../middlewares/auth");
const course_input_1 = require("../interfaces/course.input");
let CourseResolver = class CourseResolver {
    constructor(courseServicer) {
        this.courseServicer = courseServicer;
        this.courseServicer = new course_service_1.default();
    }
    addCourse(input, ctx) {
        return this.courseServicer.addCourse(input, ctx);
    }
    updateCourse(input, ctx) {
        return this.courseServicer.updateCourse(input, ctx);
    }
    deleteCourse(id, ctx) {
        return this.courseServicer.deleteCourse(id, ctx);
    }
};
exports.CourseResolver = CourseResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_input_1.AddCourseInput, Object]),
    __metadata("design:returntype", void 0)
], CourseResolver.prototype, "addCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_input_1.UpdateCourseInput, Object]),
    __metadata("design:returntype", void 0)
], CourseResolver.prototype, "updateCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CourseResolver.prototype, "deleteCourse", null);
exports.CourseResolver = CourseResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [course_service_1.default])
], CourseResolver);
