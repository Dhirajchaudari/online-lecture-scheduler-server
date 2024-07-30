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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = exports.Course = exports.LectureInfo = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const master_common_enum_1 = require("../../../interfaces/master.common.enum");
const admin_schema_1 = require("../../admin/schema/admin.schema");
const lectures_schema_1 = require("../../lectures/schema/lectures.schema");
const course_enum_1 = require("../interfaces/course.enum");
let LectureInfo = class LectureInfo {
};
exports.LectureInfo = LectureInfo;
__decorate([
    (0, type_graphql_1.Field)(() => lectures_schema_1.Lecture),
    (0, typegoose_1.prop)({ ref: () => lectures_schema_1.Lecture }),
    __metadata("design:type", Object)
], LectureInfo.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], LectureInfo.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], LectureInfo.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => master_common_enum_1.StatusEnum),
    (0, typegoose_1.prop)({ default: master_common_enum_1.StatusEnum.inActive }),
    __metadata("design:type", String)
], LectureInfo.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Date)
], LectureInfo.prototype, "start", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Date)
], LectureInfo.prototype, "end", void 0);
exports.LectureInfo = LectureInfo = __decorate([
    (0, typegoose_1.ModelOptions)({ options: { allowMixed: typegoose_1.Severity.ALLOW } }),
    (0, type_graphql_1.ObjectType)()
], LectureInfo);
let Course = class Course {
};
exports.Course = Course;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Course.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => admin_schema_1.Admin),
    (0, typegoose_1.prop)({ ref: "Admin" }),
    __metadata("design:type", Object)
], Course.prototype, "admin", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [LectureInfo], { nullable: true }),
    (0, typegoose_1.prop)({ type: LectureInfo, default: [] }),
    __metadata("design:type", Array)
], Course.prototype, "lectures", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Course.prototype, "desc", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Course.prototype, "duration", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Course.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => course_enum_1.CourseLevel),
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Course.prototype, "level", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => master_common_enum_1.StatusEnum),
    (0, typegoose_1.prop)({ default: master_common_enum_1.StatusEnum.inActive }),
    __metadata("design:type", String)
], Course.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Course.prototype, "durationByLecture", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Course.prototype, "updatedAt", void 0);
exports.Course = Course = __decorate([
    (0, typegoose_1.ModelOptions)({ options: { allowMixed: typegoose_1.Severity.ALLOW } }),
    (0, type_graphql_1.ObjectType)()
], Course);
exports.CourseModel = (0, typegoose_1.getModelForClass)(Course, {
    schemaOptions: { timestamps: true },
});
