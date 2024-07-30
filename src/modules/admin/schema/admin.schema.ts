import {
  ModelOptions,
  Ref,
  Severity,
  getModelForClass,
  index,
  pre,
  prop,
} from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";
import { AdminRole } from "../../../interfaces/master.common.enum";
import { AccessHistory } from "../../../interfaces/master.common.schema";

@pre<Admin>("save", async function () {
  // check if password is being modified
  if (!this.isModified("password")) {
    return;
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class Admin {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  name: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  email: string;

  @Field(() => String)
  @prop({ required: true, trim: true })
  phone: string;

  @Field(() => AdminRole)
  @prop({ required: true })
  role: AdminRole;

  @Field(() => Number)
  @prop({ default: 0 })
  numberOfResetPassword: number;

  @prop({ required: false, trim: true })
  password: string;

  @Field(() => [AccessHistory], { nullable: true })
  @prop({ type: [AccessHistory], default: [] })
  accessHistory: AccessHistory[];

  @Field(() => String,{nullable:true})
  @prop()
  createdBy: string;

  @Field(() => Date, { nullable: true })
  @prop({ default: null })
  lastLoggedIn: Date;

  @Field(() => Date, { nullable: true })
  @prop({ default: null })
  lastLoggedOut: Date;

  @Field(() => Date)
  @prop()
  createdAt: Date;

  @Field(() => Date)
  @prop()
  updatedAt: Date;
}
export const AdminModel = getModelForClass(Admin, {
  schemaOptions: { timestamps: true },
});
