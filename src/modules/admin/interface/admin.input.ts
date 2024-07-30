import { Field, InputType } from "type-graphql";
import { AdminRole } from "../../../interfaces/master.common.enum";



@InputType()
export class AddAdminInput {
    @Field(() => String,{nullable:false})
    name: string

    @Field(() => String,{nullable:false})
    email: string

    @Field(() => String,{nullable:false})
    phone: string

    @Field(() => String,{nullable:false})
    password: string

    @Field(() => AdminRole,{nullable:false})
    role: AdminRole;
}