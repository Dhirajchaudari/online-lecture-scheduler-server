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
exports.InstructorResolver = void 0;
const type_graphql_1 = require("type-graphql");
const instructor_service_1 = __importDefault(require("../service/instructor.service"));
const auth_1 = require("../../../middlewares/auth");
let InstructorResolver = class InstructorResolver {
    constructor(instructorService) {
        this.instructorService = instructorService;
        this.instructorService = new instructor_service_1.default();
    }
    removeCourseFromInstructor(instructorId, courseId, ctx) {
        return this.instructorService.removeCourseFromInstructor(instructorId, courseId, ctx);
    }
    deleteInstructor(id, ctx) {
        return this.instructorService.deleteInstructor(id, ctx);
    }
};
exports.InstructorResolver = InstructorResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Arg)("instructorId")),
    __param(1, (0, type_graphql_1.Arg)("courseId")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], InstructorResolver.prototype, "removeCourseFromInstructor", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)([auth_1.isAuth, auth_1.isAdmin]),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InstructorResolver.prototype, "deleteInstructor", null);
exports.InstructorResolver = InstructorResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [instructor_service_1.default])
], InstructorResolver);
