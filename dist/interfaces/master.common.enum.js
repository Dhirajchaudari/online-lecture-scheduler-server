"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusEnum = exports.AdminRole = void 0;
const type_graphql_1 = require("type-graphql");
var AdminRole;
(function (AdminRole) {
    AdminRole["admin"] = "admin";
    AdminRole["instructor"] = "instructor";
})(AdminRole || (exports.AdminRole = AdminRole = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["active"] = "active";
    StatusEnum["inActive"] = "inactive";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
(0, type_graphql_1.registerEnumType)(AdminRole, {
    name: "AdminRole",
    description: "Types of Admin Roles",
});
(0, type_graphql_1.registerEnumType)(StatusEnum, {
    name: "StatusEnum",
    description: "Status enum type.",
});
