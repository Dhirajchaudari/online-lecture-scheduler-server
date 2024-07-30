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
exports.InstructorModel = exports.Instructor = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const admin_schema_1 = require("../../admin/schema/admin.schema");
const course_schema_1 = require("../../course/schema/course.schema");
let Instructor = class Instructor {
};
exports.Instructor = Instructor;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Instructor.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => admin_schema_1.Admin, { nullable: false }),
    (0, typegoose_1.prop)({ ref: "Admin" }),
    __metadata("design:type", Object)
], Instructor.prototype, "admin", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [course_schema_1.LectureInfo], { nullable: true }),
    (0, typegoose_1.prop)({ type: course_schema_1.LectureInfo, default: [] }),
    __metadata("design:type", Array)
], Instructor.prototype, "courses", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Instructor.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Instructor.prototype, "updatedAt", void 0);
exports.Instructor = Instructor = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typegoose_1.ModelOptions)({ options: { allowMixed: typegoose_1.Severity.ALLOW } })
], Instructor);
exports.InstructorModel = (0, typegoose_1.getModelForClass)(Instructor, {
    schemaOptions: { timestamps: true },
});
