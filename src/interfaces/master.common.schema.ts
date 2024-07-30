import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";



@ObjectType()
export class DeviceInfo {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  type: string;

  @Field(() => String)
  @prop({ required: true })
  deviceName: string;

  @Field(() => String)
  @prop({ required: true })
  deviceOS: string;
}

@ObjectType()
export class AccessHistory {
  @Field(() => ID)
  _id: string;

  @Field(() => DeviceInfo)
  @prop({ required: true })
  device: DeviceInfo;

  @Field(() => Date)
  @prop()
  createdAt: Date;
}