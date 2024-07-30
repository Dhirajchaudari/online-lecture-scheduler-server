import {
  ModelOptions,
  Ref,
  Severity,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { StatusEnum } from "../../../interfaces/master.common.enum";
import { Admin } from "../../admin/schema/admin.schema";
import { Course } from "../../course/schema/course.schema";

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class Lecture {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  name: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  desc: string;

  @Field(() => Course, { nullable: true })
  @prop({ ref: "Course" })
  course: Ref<Course>;

  @Field(() => Admin)
  @prop({ ref: "Admin" })
  createdBy: Ref<Admin>;

  @Field(() => Admin)
  @prop({ ref: "Admin" })
  updatedBy: Ref<Admin>;

  @Field(() => String)
  @prop({})
  videoLink: string;

  @Field(() => StatusEnum)
  @prop({ default: StatusEnum.inActive })
  status: StatusEnum;

  @Field(() => Date, { nullable: true })
  @prop({ default: null })
  start: Date;

  @Field(() => Date, { nullable: true })
  @prop({ default: null })
  end: Date;

  @Field(() => Date, { nullable: true })
  @prop({ default: null })
  duration: Date;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}
export const LectureModel = getModelForClass(Lecture, {
  schemaOptions: { timestamps: true },
});
