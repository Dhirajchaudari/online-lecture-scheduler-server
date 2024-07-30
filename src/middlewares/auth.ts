import { MiddlewareFn } from "type-graphql";
import Context from "../utils/context";
import { ErrorWithProps } from "mercurius";
import { AdminModel } from "../modules/admin/schema/admin.schema";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.user) {
    throw new ErrorWithProps("You are not authenticated!");
  }
  return await next();
};

export const isAdmin: MiddlewareFn<Context> = async ({ context }, next) => {
  const admin = await AdminModel.findOne({ _id: context?.user })
    .lean();
  if (!admin) {
    throw new ErrorWithProps("Admin not found!");
  } 
  return await next();
};
