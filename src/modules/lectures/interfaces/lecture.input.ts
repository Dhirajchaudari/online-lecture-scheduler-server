import { Field, InputType } from "type-graphql";
import { StatusEnum } from "../../../interfaces/master.common.enum";

@InputType()
export class AddLectureInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  desc: string;

  @Field(() => String, { nullable: true })
  videoLink: string;

  @Field(() => StatusEnum, { nullable: false })
  status: StatusEnum;

  @Field(() => String, { nullable: true })
  duration: string;

  @Field(() => String, { nullable: false })
  start: string;

  @Field(() => String, { nullable: false })
  end: string;
}

@InputType()
export class UpdateLectureInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  desc: string;

  @Field(() => String, { nullable: true })
  videoLink: string;

  @Field(() => StatusEnum, { nullable: true })
  status: StatusEnum;

  @Field(() => String, { nullable: true })
  duration: string;

  @Field(() => String, { nullable: true })
  start: string;

  @Field(() => String, { nullable: true })
  end: string;
}
