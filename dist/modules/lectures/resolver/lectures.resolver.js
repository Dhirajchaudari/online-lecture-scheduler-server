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
exports.LectureResolver = void 0;
const type_graphql_1 = require("type-graphql");
const lectures_services_1 = __importDefault(require("../services/lectures.services"));
const auth_1 = require("../../../middlewares/auth");
const lecture_input_1 = require("../interfaces/lecture.input");
const lectures_schema_1 = require("../schema/lectures.schema");
let LectureResolver = class LectureResolver {
    constructor(lectureService) {
        this.lectureService = lectureService;
        this.lectureService = new lectures_services_1.default();
    }
    addLecture(input, ctx) {
        return this.lectureService.addLecture(input, ctx);
    }
    updateLecture(input, ctx) {
        return this.lectureService.updateLecture(input, ctx);
    }
    getLecturesByInstructor(ctx) {
        return this.lectureService.getLecturesByInstructor(ctx);
    }
    deleteLecture(id, ctx) {
        return this.lectureService.deleteLecture(id, ctx);
    }
    addLectureToCourse(courseId, lectureId, ctx) {
        return this.lectureService.addLectureToCourse(courseId, lectureId, ctx);
    }
};
exports.LectureResolver = LectureResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lecture_input_1.AddLectureInput, Object]),
    __metadata("design:returntype", void 0)
], LectureResolver.prototype, "addLecture", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lecture_input_1.UpdateLectureInput, Object]),
    __metadata("design:returntype", void 0)
], LectureResolver.prototype, "updateLecture", null);
__decorate([
    (0, type_graphql_1.Query)(() => [lectures_schema_1.Lecture], { nullable: true, defaultValue: [] }),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LectureResolver.prototype, "getLecturesByInstructor", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LectureResolver.prototype, "deleteLecture", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Arg)("courseId")),
    __param(1, (0, type_graphql_1.Arg)("lectureId")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], LectureResolver.prototype, "addLectureToCourse", null);
exports.LectureResolver = LectureResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [lectures_services_1.default])
], LectureResolver);
