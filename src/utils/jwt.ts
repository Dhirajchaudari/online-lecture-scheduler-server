import { Admin } from "../modules/admin/schema/admin.schema"

export interface TokenType {
  user: string;
  role: Admin["role"] | undefined;
}

export interface VerificationTokenType {
  email: string;
  id: string;
  teamMemberUserId: string | undefined;
}
