import type { AccessArgs } from "payload";

import type { User } from "@/payload-types";
import { checkRole } from "./checkRole";
import { admins } from "./admin";
import type { Access } from "payload";

const readCustomer: Access = ({ req }) => {
  const { user, routeParams } = req;
  // 1️⃣ Deny if no authenticated user
  if (!user) return false;

  // 2️⃣ Allow if user has admin/guest role
  if (user?.role && checkRole(['guest', 'admin'], user)) {
    return true
  }

  if (checkRole(['customer'], user)) {
    return {
      id: {
        equals: +user.id,
      },
    }
  }

  return false;
};

const updateCustomer: Access = ({ req }) => {
  const { user, routeParams } = req;

  if (!user) return false;

  if (checkRole(['admin'], user)) {
    return true;
  }

  if (checkRole(['customer'], user)) {
    return String(routeParams?.id) === String(user.id);
  }

  return false;
}

const deleteCustomer: Access = ({ req }) => {
  const { user } = req;
  
  if (checkRole(['admin'], user)) {
    
    return true;
  }
  return false;
}

export { readCustomer, updateCustomer, deleteCustomer };