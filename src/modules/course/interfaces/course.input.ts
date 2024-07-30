import { Field, InputType } from "type-graphql";
import { CourseLevel } from "./course.enum";

@InputType()
export class AddCourseInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  desc: string;

  @Field(() => Number, { nullable: false })
  price: number;

  @Field(() => String, { nullable: false })
  duration: string;

  @Field(() => String,{nullable:false})
  image: string;

  @Field(() => CourseLevel,{nullable:false})
  level: CourseLevel;
}

@InputType()
export class UpdateCourseInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  desc: string;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => String, { nullable: true })
  duration: string;
  
  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => CourseLevel, { nullable: true })
  level: CourseLevel;
}
