import {
  ModelOptions,
  Ref,
  Severity,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Admin } from "../../admin/schema/admin.schema";
import { LectureInfo } from "../../course/schema/course.schema";


@ObjectType()
@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Instructor {
  @Field(() => ID)
  _id: string;

  @Field(() => Admin, { nullable: false })
  @prop({ ref: "Admin" })
  admin: Ref<Admin>;

  @Field(() => [LectureInfo], { nullable: true })
  @prop({ type: LectureInfo, default: [] })
  courses: LectureInfo[];

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}
export const InstructorModel = getModelForClass(Instructor, {
  schemaOptions: { timestamps: true },
});
