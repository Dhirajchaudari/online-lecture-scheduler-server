import { registerEnumType } from "type-graphql";

export enum AdminRole {
    admin = "admin",
    instructor = "instructor"
}

export enum StatusEnum {
  active = "active",
  inActive = "inactive",
}

registerEnumType(AdminRole, {
  name: "AdminRole",
  description: "Types of Admin Roles",
});

registerEnumType(StatusEnum, {
  name: "StatusEnum",
  description: "Status enum type.",
});

