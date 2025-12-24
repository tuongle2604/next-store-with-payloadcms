import type { AccessArgs } from "payload";
import type { Access } from "payload";
import type { User } from "@/payload-types";
import { checkRole } from "./checkRole";

export const readOrderResources: Access = ({ req: { user, routeParams } }) => {
  if (!user) return false;

  if (user.role && checkRole(["guest", "admin"], user)) {
    return true;
  }

  // If routeParams.id is present, allow access only to orders belonging to the user
  if (routeParams?.id) {
    return {
      customer: {
        equals: +user.id,
      },
    };
  }

  return false;
};
