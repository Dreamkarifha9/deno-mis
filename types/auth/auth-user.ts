import { UserRole } from "../user/user-role.ts";

/**
 * Authenticated user info
 * user as JWT access token payload
 */
export type AuthUser = {
  /** user id */
  userid: string;
  /** user email address */
  /** user roles */
  roles: string;
};
