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
exports.LectureModel = exports.Lecture = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const master_common_enum_1 = require("../../../interfaces/master.common.enum");
const admin_schema_1 = require("../../admin/schema/admin.schema");
const course_schema_1 = require("../../course/schema/course.schema");
let Lecture = class Lecture {
};
exports.Lecture = Lecture;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Lecture.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Lecture.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Lecture.prototype, "desc", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => course_schema_1.Course, { nullable: true }),
    (0, typegoose_1.prop)({ ref: "Course" }),
    __metadata("design:type", Object)
], Lecture.prototype, "course", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => admin_schema_1.Admin),
    (0, typegoose_1.prop)({ ref: "Admin" }),
    __metadata("design:type", Object)
], Lecture.prototype, "createdBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => admin_schema_1.Admin),
    (0, typegoose_1.prop)({ ref: "Admin" }),
    __metadata("design:type", Object)
], Lecture.prototype, "updatedBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({}),
    __metadata("design:type", String)
], Lecture.prototype, "videoLink", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => master_common_enum_1.StatusEnum),
    (0, typegoose_1.prop)({ default: master_common_enum_1.StatusEnum.inActive }),
    __metadata("design:type", String)
], Lecture.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Date)
], Lecture.prototype, "start", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Date)
], Lecture.prototype, "end", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Date)
], Lecture.prototype, "duration", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Lecture.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Lecture.prototype, "updatedAt", void 0);
exports.Lecture = Lecture = __decorate([
    (0, typegoose_1.ModelOptions)({ options: { allowMixed: typegoose_1.Severity.ALLOW } }),
    (0, type_graphql_1.ObjectType)()
], Lecture);
exports.LectureModel = (0, typegoose_1.getModelForClass)(Lecture, {
    schemaOptions: { timestamps: true },
});
