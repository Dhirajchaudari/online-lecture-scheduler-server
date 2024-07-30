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
exports.UpdateCourseInput = exports.AddCourseInput = void 0;
const type_graphql_1 = require("type-graphql");
const course_enum_1 = require("./course.enum");
let AddCourseInput = class AddCourseInput {
};
exports.AddCourseInput = AddCourseInput;
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], AddCourseInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], AddCourseInput.prototype, "desc", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: false }),
    __metadata("design:type", Number)
], AddCourseInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], AddCourseInput.prototype, "duration", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], AddCourseInput.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => course_enum_1.CourseLevel, { nullable: false }),
    __metadata("design:type", String)
], AddCourseInput.prototype, "level", void 0);
exports.AddCourseInput = AddCourseInput = __decorate([
    (0, type_graphql_1.InputType)()
], AddCourseInput);
let UpdateCourseInput = class UpdateCourseInput {
};
exports.UpdateCourseInput = UpdateCourseInput;
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], UpdateCourseInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateCourseInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateCourseInput.prototype, "desc", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], UpdateCourseInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateCourseInput.prototype, "duration", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateCourseInput.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => course_enum_1.CourseLevel, { nullable: true }),
    __metadata("design:type", String)
], UpdateCourseInput.prototype, "level", void 0);
exports.UpdateCourseInput = UpdateCourseInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateCourseInput);
