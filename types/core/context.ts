import { Context as OakContext } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import { AuthUser } from "./../auth/auth-user.ts";

/**
 * Custom appilication context
 */
export class Context extends OakContext {
  user?: AuthUser;
}
