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
import { Lecture } from "../../lectures/schema/lectures.schema";
import { CourseLevel } from "../interfaces/course.enum";

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class LectureInfo {
  @Field(() => Lecture)
  @prop({ ref: () => Lecture })
  _id: Ref<Lecture>;

  @Field(() => String)
  @prop({ required: true })
  id: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  name: string;

  @Field(() => StatusEnum)
  @prop({ default: StatusEnum.inActive })
  status: StatusEnum;

  @Field(() => Date, { nullable: true })
  @prop({ default: null })
  start: Date;

  @Field(() => Date, { nullable: true })
  @prop({ default: null })
  end: Date;
}

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class Course {
  @Field(() => ID)
  _id: string;

  @Field(() => Admin)
  @prop({ ref: "Admin" })
  admin: Ref<Admin>;

  @Field(() => [LectureInfo], { nullable: true })
  @prop({ type: LectureInfo, default: [] })
  lectures: LectureInfo[];

  @Field(() => String)
  @prop({ required: true, trim: true })
  name: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  desc: string;

  @Field(() => Number)
  @prop({ required: true, default: 0 })
  price: number;

  @Field(() => String)
  @prop({})
  duration: string;

  @Field(() => String)
  @prop({})
  image: string;

  @Field(() => CourseLevel)
  @prop({})
  level: CourseLevel;

  @Field(() => StatusEnum)
  @prop({ default: StatusEnum.inActive })
  status: StatusEnum;

  @Field(() => String)
  @prop({})
  durationByLecture: string;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}
export const CourseModel = getModelForClass(Course, {
  schemaOptions: { timestamps: true },
});
