import { FastifyReply, FastifyRequest } from "fastify";
import { Admin } from "../modules/admin/schema/admin.schema";

interface Context {
  req?: FastifyRequest;
  rep?: FastifyReply;
  user: string | undefined;
  role: Admin["role"] | undefined;
}

export default Context;
