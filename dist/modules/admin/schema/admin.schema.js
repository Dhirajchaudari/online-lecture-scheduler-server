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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.Admin = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const bcrypt_1 = __importDefault(require("bcrypt"));
const master_common_enum_1 = require("../../../interfaces/master.common.enum");
const master_common_schema_1 = require("../../../interfaces/master.common.schema");
let Admin = class Admin {
};
exports.Admin = Admin;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Admin.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Admin.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Admin.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => master_common_enum_1.AdminRole),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Admin.prototype, "role", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Admin.prototype, "numberOfResetPassword", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, trim: true }),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [master_common_schema_1.AccessHistory], { nullable: true }),
    (0, typegoose_1.prop)({ type: [master_common_schema_1.AccessHistory], default: [] }),
    __metadata("design:type", Array)
], Admin.prototype, "accessHistory", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Admin.prototype, "createdBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Date)
], Admin.prototype, "lastLoggedIn", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Date)
], Admin.prototype, "lastLoggedOut", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Admin.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Admin.prototype, "updatedAt", void 0);
exports.Admin = Admin = __decorate([
    (0, typegoose_1.pre)("save", async function () {
        // check if password is being modified
        if (!this.isModified("password")) {
            return;
        }
        // hash password
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = bcrypt_1.default.hashSync(this.password, salt);
        this.password = hash;
    }),
    (0, typegoose_1.ModelOptions)({ options: { allowMixed: typegoose_1.Severity.ALLOW } }),
    (0, type_graphql_1.ObjectType)()
], Admin);
exports.AdminModel = (0, typegoose_1.getModelForClass)(Admin, {
    schemaOptions: { timestamps: true },
});
