import { AuthUser } from "../types.ts";
import { UserRole, UserRead } from "../types/user/user-role.ts";

const hasUserRoleCreate = (user: AuthUser, roles: UserRole | UserRole[]) => {
  const userRoles = user.roles.split(",")
    .map((role) => role.trim());

  if (typeof (roles) == "string") {
    roles = [roles];
  }

  let isRoleMatched = false;
  roles.forEach((role) => {
    if (userRoles.includes(role)) {
      isRoleMatched = true;
    }
  });

  return isRoleMatched;
};
const hasUserRoleUpdate = (user: AuthUser, roles: UserRole | UserRole[]) => {
  const userRoles = user.roles.split(",")
    .map((role) => role.trim());

  if (typeof (roles) == "string") {
    roles = [roles];
  }

  let isRoleMatched = false;
  roles.forEach((role) => {
    if (userRoles.includes(role)) {
      isRoleMatched = true;
    }
  });

  return isRoleMatched;
};

const hasUserRoleRead = (user: AuthUser, roles: UserRole | UserRole[]) => {
  const userRoles = user.roles.split(",")
    .map((role) => role.trim());

  if (typeof (roles) == "string") {
    roles = [roles];
  }

  let isRoleMatched = false;
  roles.forEach((role) => {
    if (userRoles.includes(role)) {
      isRoleMatched = true;
    }
  });

  return isRoleMatched;
};

const hasUserRoleDelete = (user: AuthUser, roles: UserRole | UserRole[]) => {
  const userRoles = user.roles.split(",")
    .map((role) => role.trim());

  if (typeof (roles) == "string") {
    roles = [roles];
  }

  let isRoleMatched = false;
  roles.forEach((role) => {
    if (userRoles.includes(role)) {
      isRoleMatched = true;
    }
  });

  return isRoleMatched;
};

export {
  hasUserRoleCreate,
  hasUserRoleUpdate,
  hasUserRoleRead,
  hasUserRoleDelete,
};
