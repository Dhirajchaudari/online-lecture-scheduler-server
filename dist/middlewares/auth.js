"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuth = void 0;
const mercurius_1 = require("mercurius");
const admin_schema_1 = require("../modules/admin/schema/admin.schema");
const isAuth = async ({ context }, next) => {
    if (!context.user) {
        throw new mercurius_1.ErrorWithProps("You are not authenticated!");
    }
    return await next();
};
exports.isAuth = isAuth;
const isAdmin = async ({ context }, next) => {
    const admin = await admin_schema_1.AdminModel.findOne({ _id: context?.user })
        .lean();
    if (!admin) {
        throw new mercurius_1.ErrorWithProps("Admin not found!");
    }
    return await next();
};
exports.isAdmin = isAdmin;
