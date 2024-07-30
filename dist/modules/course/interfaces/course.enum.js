"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseLevel = void 0;
const type_graphql_1 = require("type-graphql");
var CourseLevel;
(function (CourseLevel) {
    CourseLevel["beginner"] = "beginner";
    CourseLevel["intermediate"] = "intermediate";
    CourseLevel["advanced"] = "advanced";
    CourseLevel["professional"] = "professional";
})(CourseLevel || (exports.CourseLevel = CourseLevel = {}));
(0, type_graphql_1.registerEnumType)(CourseLevel, {
    name: "CourseLevel",
    description: "Different level of courses",
});
